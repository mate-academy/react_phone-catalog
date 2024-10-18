import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import './App.scss';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';

export const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
