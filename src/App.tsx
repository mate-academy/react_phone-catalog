import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Footer } from './components/Footer/Footer';

interface AppProps {
  hideNavigation: boolean;
}

export const App: React.FC<AppProps> = ({ hideNavigation }) => {
  return (
    <>
      {!hideNavigation && <Navigation />}
      <div className="section">
        <div>
          <Outlet />
        </div>
      </div>
      {!hideNavigation && <Footer />}
    </>
  );
};
