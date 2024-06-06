import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './modules/Navbar';
import { Menu } from './modules/Menu';
import { useContext } from 'react';
import { StateContext } from './Store';
import { Footer } from './modules/Footer';

export const App = () => {
  const { isMenuOpen } = useContext(StateContext);

  return (
    <div className="App">
      <Navbar />

      {isMenuOpen && <Menu />}
      {!isMenuOpen && <Outlet />}

      {!isMenuOpen && <Footer />}
    </div>
  );
};
