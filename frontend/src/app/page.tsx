'use client';

import { useState, useEffect } from 'react';
import { Card, Toolbar, ToolbarButton, Image, tokens } from '@fluentui/react-components';
import { Library32Filled } from '@fluentui/react-icons';
// WindowNewRegular, WindowNew24Regular,
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { GitHubLogoIcon } from '@fluentui/react-icons-mdl2';

initializeIcons();

export default function Home() {
  const [hostname, setHostname] = useState(process.env.NEXT_DOMAIN_HOSTNAME || 'localhost');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window.location.hostname);
    }
  }, []);

  return (
    <>
      {/* Header Section */}
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "15vh"
        }}
        >
        <Image
          src="lantern-transparent.png"
          alt="Lantern Image"
          fit="contain"
          />
        <Image
          src="title.png"
          alt="Title Image"
          fit="cover"
          width="50px"
          style={{
            paddingTop: tokens.spacingVerticalXXL,
            paddingBottom: tokens.spacingVerticalXXL
          }}
        />
        <Image
          src="lantern-transparent.png"
          alt="Lantern Image"
          fit="contain"
        />
      </header>

      {/* Main Content Section */}
      <main style={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        height: '65vh', // Full viewport height
        overflow: 'hidden', // Prevent overflow
      }}>
        <Card style={{
          display: 'flex', // Enable Flexbox for the card
          flexDirection: 'column', // Stack content vertically
          justifyContent: 'center', // Center content vertically
          alignItems: 'center', // Center content horizontally
          padding: tokens.spacingVerticalXXL, // Use Fluent UI token for spacing
          borderRadius: tokens.borderRadiusMedium, // Rounded corners
          boxShadow: tokens.shadow16, // Subtle shadow
          width: '45vh', // Fixed width for consistent layout
        }}>
          <Image bordered shape="circular" alt="HaxServer" src="/Shark.png"/>
          <h1 style={{
            textAlign: 'center',
            marginBottom: tokens.spacingVerticalL, // Use Fluent UI token for spacing
            fontSize: tokens.fontSizeHero700, // Fluent UI typography token
            fontWeight: tokens.fontWeightSemibold, // Fluent UI typography token
          }}>
            HaxServer
          </h1>
          {/* Vertical Toolbar Section */}
          <Toolbar vertical style={{
            gap: tokens.spacingVerticalM,
            alignItems: 'center'
          }}>
            <ToolbarButton
              as="a"
              shape="circular"
              appearance="primary"
              href="/shanchi"
            >
              {/* 將族聖殿 */}
              <Image
                src="/xiangqi-white-transparent.png"
              ></Image>
            </ToolbarButton>
            <ToolbarButton
              as="a"
              shape="circular"
              appearance="primary"
              href={`https://${hostname}:${process.env.NEXT_PUBLIC_PLEX_PORT || 32400}`}
            >
              {/* 觀雲樓 */}
              <Image
                src="/plex-white-transparent.png"
              ></Image>
              {/* <WindowNewRegular /> */}
            </ToolbarButton>
            <ToolbarButton
              as="a"
              shape="circular"
              appearance="primary"
              href={`https://${hostname}:${process.env.NEXT_PUBLIC_JELLYFIN_PORT || 8920}`}
            >
              {/* 聽雨亭 */}
              <Image
                src="/jellyfin-white-transparent.png"
              ></Image>
              {/* <WindowNewRegular /> */}
            </ToolbarButton>
            <ToolbarButton
              as="a"
              shape="circular"
              appearance="primary"
              style={{
                padding: tokens.spacingHorizontalM,
              }}
              href={`https://${hostname}:${process.env.NEXT_PUBLIC_CALIBRE_PORT || 8000}`}
              >
              {/* 智慧之屋 */}
              <Library32Filled style={{
                paddingRight: tokens.spacingHorizontalM
              }} />
              <Image
                src="/calibre-white-transparent.png"
              ></Image>
              {/* <WindowNew24Regular /> */}
            </ToolbarButton>
            <ToolbarButton
              as="a"
              shape="circular"
              appearance="primary"
              style={{
                padding: tokens.spacingHorizontalM,
              }}
              href={`https://${hostname}:${process.env.NEXT_PUBLIC_CALIBRE_PORT || 8000}`}
              // disabled={true}
            >
              {/* 智慧之屋 */}
              <Image
                src="/karaoke-white-transparent.png"
                style={{ color: 'grayscale(100%)' }} // Grayscale for disabled state
                aria-disabled="true"
              ></Image>
              {/* <WindowNew24Regular /> */}
            </ToolbarButton>
          </Toolbar>
        </Card>
      </main>

      {/* Footer Section */}
      <footer
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          height: "15vh",
          textAlign: 'center',
          paddingTop: tokens.spacingVerticalM,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <a href="https://github.com/Haxrox/HaxServer" target="_blank" rel="noopener noreferrer"
          style={{
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          <GitHubLogoIcon style={{
            fontSize: '24px',
            marginRight: '8px',
            verticalAlign: 'middle'
          }} />
        </a>
        <p>
          &copy; 2025 HaxTech. All rights reserved.
        </p>
        <div
          style={{
            width: "100%",
            height: "60%",
            backgroundImage: "url('/footer.png')",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
            backgroundSize: "auto 100%",
            marginTop: 'auto'
          }}
        />
      </footer>
    </>
  );
}
