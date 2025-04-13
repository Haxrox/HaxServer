'use client';

import { Card, Toolbar, ToolbarButton, Image, tokens } from '@fluentui/react-components';

export default function Home() {
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
            <ToolbarButton as="a" href="/about" appearance="primary">
              About Us
            </ToolbarButton>
            <ToolbarButton as="a" href="/contact" appearance="primary">
              Contact
            </ToolbarButton>
            <ToolbarButton as="a" href="/services" appearance="primary">
              Our Services
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
