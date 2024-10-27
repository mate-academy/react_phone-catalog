import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.scss';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';

export const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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

      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
