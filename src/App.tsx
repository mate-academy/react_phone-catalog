import './App.scss';

import React from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppRoutes } from './Routes/Routes';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <React.StrictMode>
        <AppRoutes />
      </React.StrictMode>
      <Footer />
    </div>
  );
};
