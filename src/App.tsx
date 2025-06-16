import './App.scss';
import './styles/fonts.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { ProductsProvider } from './context/ProductsContext';

import { createContext, useContext, useEffect, useState } from 'react';

export const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const App = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'light',
  );

  useEffect(() => {
    document.body.classList.remove('dark', 'light');

    document.body.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app">
      <ProductsProvider>
        <NavBar />
        <div className="change-theme" onClick={toggleTheme}></div>
        <div className="main">
          <Outlet />
        </div>
      </ProductsProvider>

      <Footer />
    </div>
  );
};
