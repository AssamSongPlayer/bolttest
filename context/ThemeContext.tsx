'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// Define interface for theme context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

// Hook to access theme context
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component to provide the theme state
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Effect to handle theme persistence and system preferences
  useEffect(() => {
    // Check if we are in a browser environment
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setIsDarkMode(storedTheme === 'dark');
      } else {
        // Detect system preference if no theme is stored
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    }
  }, []); // Run once on mount

  // Function to toggle theme and save to localStorage
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
