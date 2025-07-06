'use client';

import type { Metadata } from "next";
import "./globals.css";
import FluentUIProvider from "../components/FluentProvider";
import { useEffect } from "react";

const metadata: Metadata = {
  title: "HaxServer",
  description: "Pointer to all web applications created by HaxTech",
  icons: {
    icon: "/Shark.png",
    shortcut: "/Shark.png",
    apple: "/Shark.png",
  },
};

function send(
  endpoint: string,
  method = "GET",
  data: {
    tag: string;
    log: string;
  }
) {
  console.log(`${endpoint} | data: `, data);
  return fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Handle closing tab
  useEffect(() => {
    const startTime = new Date();
    console.log('HaxTech started at ' + startTime);
    window.addEventListener('beforeunload', async function (evt) {
      const endTime = new Date();
      const duration = (endTime.valueOf() - startTime.valueOf() / 1000);

      await send('api/log', "POST", {
        tag: "HaxTech",
        log: `Duration: ${duration}s`
      }).then((response) => {
        console.log('Close request sent | response: ', response);
      }).catch(error => {
        console.error('Error sending close request:', error);
      });
    });
  }, [])

  return (
    <html lang="en">
      <body>
        <FluentUIProvider>{children}</FluentUIProvider>
      </body>
    </html>
  );
}
