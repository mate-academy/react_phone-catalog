import React, { useContext } from 'react';
import './App.scss';
import { Header } from './components/shared/Header';
import { Menu } from './components/shared/Menu';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/shared/Footer';
import { GlobalContext } from './components/context/GlobalContext';

export const App: React.FC = () => {
  const { isMenuOpen } = useContext(GlobalContext);

  return (
    <div className="app">
      <Header />

      {isMenuOpen ? (
        <Menu />
      ) : (
        <main className="app__main">
          <Outlet />
        </main>
      )}

      {!isMenuOpen && <Footer />}
    </div>
  );
};
