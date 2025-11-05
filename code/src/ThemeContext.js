import React, { createContext, useState, useContext, useMemo } from 'react';

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 3. Pass the theme and toggle function to the provider
  // useMemo ensures the value object is not recreated on every render
  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Create a custom hook to easily use the context
export const useTheme = () => {
  return useContext(ThemeContext);
};