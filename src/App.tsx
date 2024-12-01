import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

import './App.scss';
import './styles/buttons.scss';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Footer } from './components/Footer';
import { ThemeContext } from './ContextProvider';

export const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    sessionStorage.setItem('browsing', 'true');
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="App">
      <Header
        handleMobileMenu={setIsMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
