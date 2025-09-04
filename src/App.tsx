import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './shared/Header/Header';
import React from 'react';
import { Footer } from './shared/Footer/Footer';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
