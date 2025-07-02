'use client';

import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';

import { ReactNode, useEffect, useState } from 'react';

export default function FluentUIProvider({
  children
}: {
  children: ReactNode
}) {
  // Dynamically choose the theme based on system preferences
  const [theme, setTheme] = useState(webLightTheme); // Default to light theme
  const [backgroundImg, setBackgroundImage] = useState("background.jpg");
  useEffect(() => {
    // Check system preference for dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDarkMode ? webDarkTheme : webLightTheme);
    setBackgroundImage(prefersDarkMode ? "dark-background.png" : "background.jpg");

    // Add a listener to detect changes in system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? webDarkTheme : webLightTheme);
      setBackgroundImage(e.matches ? "dark-background.png" : "background.jpg");
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return <FluentProvider theme={theme} style={{
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundImage: `url(${backgroundImg})`, // Optional background image
    backgroundRepeat: 'repeat', // Repeat background
  }
}>
    {children}
  </FluentProvider>;
}
