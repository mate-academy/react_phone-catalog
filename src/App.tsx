import './App.scss';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  window.onscroll = function () {
    if (window.scrollY >= 80) {
      setIsVisible(true);

      return;
    }

    setIsVisible(false);
  };

  return (
    <div className="app">
      <header className="app__header">
        <Header />
      </header>

      <main className="app__main" id="myElem">
        <div className="app__container">
          <Outlet />
        </div>
      </main>

      <footer className="app__footer">
        <Footer isVisible={isVisible} />
      </footer>
    </div>
  );
};
