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

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDarkMode ? webDarkTheme : webLightTheme);

    // Add a listener to detect changes in system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? webDarkTheme : webLightTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // useEffect(() => {
  //   // Update the body background colour with the secondary theme color
  //   const secondaryColor = theme === webDarkTheme ? '#171717' : '#ededed'; // Match body background

  //   document.body.style.backgroundColor = secondaryColor;
  //   document.body.style.color = secondaryColor;
  // }, [theme]);

  return <FluentProvider theme={theme} style={{
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  }}>
    {children}
  </FluentProvider>;
}
