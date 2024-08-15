import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/sections/Header';
import { Footer } from './components/sections/Footer';
import { Menu } from './components/Menu';
import { useState } from 'react';

export const App = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(prev => !prev);

    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  return (
    <div className="app">
      <Header isMenuActive={isMenuActive} handleBurgerClick={toggleMenu} />
      <Menu
        className={`${isMenuActive ? 'menu--active app__menu' : 'app__menu'}`}
      />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
