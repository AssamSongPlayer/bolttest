'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// Define the context type
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Provider component to wrap your app
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check for stored theme or system preference on initial load
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setIsDarkMode(storedTheme === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    } catch (err) {
      console.error('Error reading theme from localStorage:', err);
    }
  }, []);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      try {
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
      } catch (err) {
        console.error('Error saving theme to localStorage:', err);
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the context in case you need to use it directly (optional)
export { ThemeContext };
