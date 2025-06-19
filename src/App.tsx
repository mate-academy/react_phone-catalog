import './i18n';
import './App.scss';
import './styles/fonts.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { ProductsProvider } from './context/ProductsContext';

import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const App = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'light',
  );

  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.classList.remove('dark', 'light');

    document.body.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLangChange = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('uk');
    } else {
      i18n.changeLanguage('en');
    }
  };

  return (
    <div className="app">
      <ProductsProvider>
        <NavBar />
        <div className="change-theme" onClick={toggleTheme}></div>
        <div className="change-lang" onClick={() => handleLangChange()}>
          {i18n.language === 'en' ? 'EN' : 'UK'}
        </div>
        <div className="main">
          <Outlet />
        </div>
      </ProductsProvider>

      <Footer />
    </div>
  );
};
