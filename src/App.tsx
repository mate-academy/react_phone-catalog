import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { useEffect, useState } from 'react';

export const App = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const location = useLocation();

  if (isMenuActive) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.removeAttribute('class');
  }

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

  useEffect(() => {
    setIsMenuActive(false);
    window.scrollTo(0, 0);
  }, [location]);

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
