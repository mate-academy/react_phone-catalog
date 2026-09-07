import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <main className="App__page page">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
