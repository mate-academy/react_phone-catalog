import './App.scss';
import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { Outlet, useParams } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  const { phoneId, tabletId, accessoryId } = useParams();

  useEffect(() => {
    if (phoneId || tabletId || accessoryId) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [phoneId, tabletId, accessoryId]);

  return (
    <div className="App">
      <Navigation />

      <Outlet />

      <Footer />
    </div>
  );
};
