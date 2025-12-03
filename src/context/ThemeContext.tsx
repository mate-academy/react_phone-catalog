// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Tipos de tema suportados
type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Criação do contexto
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  // Carregar tema salvo no localStorage ao montar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme: Theme = savedTheme ?? 'light';

    setTheme(initialTheme);
    // ✅ aplica classe no <html> para facilitar CSS
    document.documentElement.className =
      initialTheme === 'dark' ? 'dark-theme' : 'light-theme';
  }, []);

  // Alternar tema
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);

    // Persistência
    localStorage.setItem('theme', newTheme);

    // ✅ aplica classe no <html>
    document.documentElement.className =
      newTheme === 'dark' ? 'dark-theme' : 'light-theme';
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para consumir o contexto
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }

  return context;
};
