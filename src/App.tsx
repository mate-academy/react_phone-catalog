import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BurgerMenu } from './components/BurgerMenu';
import './App.scss';
import { useCallback, useState } from 'react';

export const App = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const openMenu = useCallback(() => {
    setMenuOpened(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpened(false);
  }, []);

  return (
    <div className="App">
      <Header openMenu={openMenu} />
      <BurgerMenu isOpened={menuOpened} closeMenu={closeMenu} />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
