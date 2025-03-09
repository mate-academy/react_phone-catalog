import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="container">
      <div className="app">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Aside isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="app__container">
          <main className="app__main">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};
