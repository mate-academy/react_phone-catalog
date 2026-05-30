import { Outlet } from 'react-router-dom';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { BurgerMenu } from './Components/BurgerMenu';
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
