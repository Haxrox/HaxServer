'use client';

import { useState, useEffect } from 'react';
import {
  Toolbar,
  Image,
  tokens,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
  Menu,
  MenuItemLink,
  MenuItem,
  useFluent,
  webDarkTheme,
  webLightTheme
} from '@fluentui/react-components';
// Card,
// import { Library32Filled } from '@fluentui/react-icons';
// WindowNewRegular, WindowNew24Regular,
import { initializeIcons } from '@fluentui/font-icons-mdl2';
// import { GitHubLogoIcon } from '@fluentui/react-icons-mdl2';

import MainButton from '@/components/MainButton';
import VisitCounter from '@/components/VisitCounter';
import { useTheme } from '@/components/FluentProvider';
initializeIcons();

export default function Home() {
  const [hostname, setHostname] = useState(process.env.NEXT_DOMAIN_HOSTNAME || 'localhost');
  const themeContext = useTheme();
  const theme = themeContext.theme;
  const isDarkMode = themeContext.isDarkMode ?? false;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(process.env.NEXT_DOMAIN_HOSTNAME || window.location.hostname);
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
          fit="contain"
          width="50vh"
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
        {/* <Card style={{
          display: 'flex', // Enable Flexbox for the card
          flexDirection: 'column', // Stack content vertically
          justifyContent: 'center', // Center content vertically
          alignItems: 'center', // Center content horizontally
          padding: tokens.spacingVerticalXXL, // Use Fluent UI token for spacing
          borderRadius: tokens.borderRadiusMedium, // Rounded corners
          boxShadow: tokens.shadow16, // Subtle shadow
          width: '45vh', // Fixed width for consistent layout
        }}> */}
          {/* <Image bordered shape="circular" alt="HaxServer" src="/Shark.png"/> */}
          {/* <h1 style={{
            textAlign: 'center',
            marginBottom: tokens.spacingVerticalL, // Use Fluent UI token for spacing
            fontSize: tokens.fontSizeHero700, // Fluent UI typography token
            fontWeight: tokens.fontWeightSemibold, // Fluent UI typography token
          }}>
            HaxServer
          </h1> */}
          {/* Vertical Toolbar Section */}
          <Toolbar vertical style={{
            gap: tokens.spacingVerticalM,
            alignItems: 'center'
          }}>
          <Menu positioning="after">
            <MenuTrigger disableButtonEnhancement>
              <MenuButton appearance="primary" shape="circular" style={{
                paddingBlock: tokens.spacingHorizontalM,
                boxShadow: tokens.shadow16,
                height: '7vh'
              }}>
                <Image
                  src="/xiangqi-white-transparent.png"
                  fit="contain"
                  alt="Xiangqi Game"
                  />
              </MenuButton>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItemLink href="/shanchi">
                  <Image
                    src="/將兵神棋logo.png"
                    fit="contain"
                    alt="{text}"
                    style={{
                      width: '200px',
                      filter: isDarkMode ? 'none' : 'invert(1)'
                    }} // Adjust size as needed
                    />
                </MenuItemLink>
                <MenuItemLink href="/wenpu">
                  <Image
                    src="/問譜logo.png"
                    fit="contain"
                    alt="{text}"
                    style={{
                      width: '200px',
                      filter: isDarkMode ? 'none' : 'invert(1)'
                    }} // Adjust size as needed
                  />
                </MenuItemLink>
                <MenuItemLink href="/shanchi-lobby">
                  <Image
                    src="/禿頭峰大擂台logo.png"
                    fit="contain"
                    alt="{text}"
                    style={{
                      width: '200px',
                      filter: isDarkMode ? 'none' : 'invert(1)'
                    }} // Adjust size as needed
                    />
                </MenuItemLink>
                <MenuItemLink href="/shanchi-leaderboard">
                  <Image
                    src="/封神榜logo.png"
                    fit="contain"
                    alt="{text}"
                    style={{
                      width: '200px',
                      filter: isDarkMode ? 'none' : 'invert(1)'
                    }} // Adjust size as needed
                  />
                </MenuItemLink>
              </MenuList>
            </MenuPopover>
          </Menu>
          <MainButton
            href={`https://${hostname}:${process.env.NEXT_PUBLIC_PLEX_PORT || 32400}`}
            img="/plex-white-transparent.png"
          />
          <MainButton
            href={`https://${hostname}:${process.env.NEXT_PUBLIC_JELLYFIN_PORT || 8920}`}
            img="/jellyfin-white-transparent.png"
          />
          <MainButton
            href={`https://${hostname}:${process.env.NEXT_PUBLIC_CALIBRE_PORT || 8000}`}
            img="/calibre-white-transparent.png"
          />
          <MainButton
            href="/xiangqi"
            img="/karaoke-white-transparent.png"
          />
        </Toolbar>
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
        <VisitCounter />
        {/* <a href="https://github.com/Haxrox/HaxServer" target="_blank" rel="noopener noreferrer"
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
        </a> */}
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
