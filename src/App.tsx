import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './shared/Footer';
import { Header } from './shared/Header';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    document.body.classList.add('no-transition');

    setTimeout(() => {
      document.body.classList.remove('no-transition');
    }, 1000);
  }, []);

  return (
    <div className="App">
      <header>
        <Header />
      </header>

      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
