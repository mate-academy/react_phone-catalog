import styles from './Layout.module.scss';
import Aside from '@/molecules/Aside';
import Footer from '@/organisms/Footer';
import Header from '@/organisms/Header';
import Page from '@/atoms/Page';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem('theme');

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
};

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const handleMenuButtonClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleAsideNavigate = () => {
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={styles.layout}>
      <Header
        theme={theme}
        onThemeToggle={handleThemeToggle}
        isMenuOpen={isMenuOpen}
        onMenuButtonClick={handleMenuButtonClick}
      />
      <Aside isOpen={isMenuOpen} onNavigate={handleAsideNavigate} />
      <div className={styles.borders}>
        <Page>
          <Outlet />
        </Page>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
