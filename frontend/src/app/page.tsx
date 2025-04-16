'use client';

import { useState, useEffect } from 'react';
import { Card, Toolbar, ToolbarButton, Image, tokens } from '@fluentui/react-components';
import { WindowNewRegular } from '@fluentui/react-icons';

export default function Home() {
  const [hostname, setHostname] = useState('localhost');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window.location.hostname);
    }
  }, []);

  return (
    <>
      {/* Header Section */}
      {/* <header>
        <Toolbar>
          <ToolbarButton appearance="primary">Home</ToolbarButton>
          <ToolbarButton>About</ToolbarButton>
          <ToolbarButton>Contact</ToolbarButton>
        </Toolbar>
      </header> */}

      {/* Main Content Section */}
      <main style={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        height: '90vh', // Full viewport height
        backgroundColor: tokens.colorNeutralBackground1, // Use Fluent UI token for background
        color: tokens.colorNeutralForeground1, // Use Fluent UI token for text
        overflow: 'hidden' // Prevent overflow
      }}>
        <Card style={{
          display: 'flex', // Enable Flexbox for the card
          flexDirection: 'column', // Stack content vertically
          justifyContent: 'center', // Center content vertically
          alignItems: 'center', // Center content horizontally
          padding: tokens.spacingVerticalXXL, // Use Fluent UI token for spacing
          borderRadius: tokens.borderRadiusMedium, // Rounded corners
          boxShadow: tokens.shadow16, // Subtle shadow
          backgroundColor: tokens.colorNeutralBackground3, // Slightly lighter background for contrast
          width: '400px', // Fixed width for consistent layout
          height: '400px', // Fixed height to ensure proper centering
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
            <ToolbarButton as="a" href="/xiangqi" appearance="primary">
              Xiangqi
            </ToolbarButton>
            <ToolbarButton
              as="a"
              href={`https://${hostname}:${process.env.NEXT_PUBLIC_PLEX_PORT || 32400}`}
              appearance="primary"
            >
              Plex
              <WindowNewRegular />
            </ToolbarButton>
            <ToolbarButton
              as="a"
              href={`https://${hostname}:${process.env.NEXT_PUBLIC_CALIBRE_PORT || 8000}`}
              appearance="primary"
            >
              Calibre
              <WindowNewRegular />
            </ToolbarButton>
          </Toolbar>
        </Card>
      </main>

      {/* Footer Section */}
      <footer
        style={{
          textAlign: 'center',
          padding: tokens.spacingVerticalM,
          color: tokens.colorNeutralForeground2, // Subtle footer text color
        }}
      >
        <p>&copy; 2025 HaxTech. All rights reserved.</p>
      </footer>
    </>
  );
}
