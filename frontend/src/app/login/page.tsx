'use client';

import Script from "next/script";
import { useEffect } from "react";
import { makeStyles, Button, Card, useId, Input, Label } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",

    maxWidth: "400px",
    // Stack the label above the field (with 2px gap per the design system)
    "> div": { display: "flex", flexDirection: "column", gap: "2px" },
  },
});

export default function Login() {
  const emailId = useId("input-email");
  const passwordId = useId("input-password");
  const styles = useStyles();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).elements.namedItem(emailId) as HTMLInputElement;
    const password = (event.target as HTMLFormElement).elements.namedItem(passwordId) as HTMLInputElement;
    console.log("Email:", email.value);
    console.log("Password:", password.value);
    // Handle login logic here, e.g., send credentials to the server
  }

  useEffect(() => {
    window.handleCredentialResponse = (response : any) => {
      console.log("Encoded JWT ID token: " + response.credential);
      // This `response.credential` is the ID token (JWT)
      const idToken = response.credential;
      // Send this ID token to your backend for verification
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: idToken }),
      })
      // sendIdTokenToBackend(idToken);
    }
  });

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async></Script>
      <div id="g_id_onload"
        data-client_id="314991611736-ou6racd7m30ua6k9h8vs355850f3ppur.apps.googleusercontent.com"
        data-context="use"
        data-ux_mode="popup"
      // data-callback="handleCredentialResponse"
        data-login_uri="http://localhost:8000/api/login"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true">
      </div>

      <div className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="filled_blue"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
      </div>

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <Card>
          <form noValidate autoComplete="off" className={styles.root} action="/api/login" method="POST">
              <Label htmlFor={emailId}>Username</Label>
              <Input name="username" type="email" id={emailId} required/>
              <Label htmlFor={passwordId}>Password</Label>
              <Input name="password" type="password" defaultValue="" id={passwordId} required />
            <div>
            </div>
            <div>
            </div>
            <Button appearance="primary" type="submit" style={{
              alignSelf: "end",
              width: "20%"
            }}>
              Login
            </Button>
          </form>
        </Card>
      </main>
    </>
  )
}