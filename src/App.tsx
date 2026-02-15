import './styles/App.scss';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BurgerMenu } from './components/BurgerMenu';

export const App: React.FC = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <div className="App">
      <Header
        toggleBurger={() => setIsBurgerOpen(!isBurgerOpen)}
        isBurgerOpen={isBurgerOpen}
      />
      <BurgerMenu
        isOpen={isBurgerOpen}
        closeMenu={() => setIsBurgerOpen(false)}
      />

      <main className="section">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
