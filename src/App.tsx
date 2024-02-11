import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';
import { Footer } from './components/Footer';

export const App = () => {
  useEffect(() => {
    const favoriteProducts = localStorage.getItem('favoriteProducts');

    if (!favoriteProducts) {
      localStorage.setItem('favoriteProducts', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <Header />

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
