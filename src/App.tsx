import { Outlet } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useState } from 'react';
import { BurgerMenu } from './components/Header/components/BurgerMenu';

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
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
