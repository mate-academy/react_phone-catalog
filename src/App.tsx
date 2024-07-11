import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';

export const App = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get('aside') === 'open') {
      setIsAsideOpen(true);
    } else {
      setIsAsideOpen(false);
    }
  }, [location.search]);

  return (
    <div className="App" id="root">
      {isAsideOpen && <Aside />}

      <Header />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
