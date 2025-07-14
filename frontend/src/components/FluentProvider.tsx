'use client';

import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';

import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';

const ThemeContext = createContext({
  isDarkMode: false,
  theme: webLightTheme,
});

export default function FluentUIProvider({
  children
}: {
  children: ReactNode
}) {
  // Dynamically choose the theme based on system preferences
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode
    ? webDarkTheme
    : webLightTheme;
  const [backgroundImg, setBackgroundImage] = useState("background.jpg");

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    setBackgroundImage(prefersDarkMode ? "dark-background.png" : "background.jpg");

    // Add a listener to detect changes in system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(prefersDarkMode);
      setBackgroundImage(e.matches ? "dark-background.png" : "background.jpg");
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return <ThemeContext.Provider value={{ isDarkMode, theme }}>
    <FluentProvider theme={theme} style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundImage: `url(${backgroundImg})`, // Optional background image
      backgroundRepeat: 'repeat', // Repeat background
    }
    }>
      {children}
    </FluentProvider>;
  </ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext);
