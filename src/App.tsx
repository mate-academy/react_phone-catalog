import './main.scss';
import { Navigation } from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { useState } from 'react';
import { BurgerMenu } from './components/BurgerMenu';

import './App.scss';

export const App = () => {
  const [isActiveBurger, setIsActiveBurger] = useState(false);

  return (
    <div className="App">
      <main className="App__main">
        <Navigation
          isActiveBurger={isActiveBurger}
          setIsActive={setIsActiveBurger}
        />
        <div className="section">
          {!isActiveBurger && <Outlet />}
          {isActiveBurger && <BurgerMenu setIsActive={setIsActiveBurger} />}
        </div>
      </main>
      {!isActiveBurger && <Footer />}
    </div>
  );
};
