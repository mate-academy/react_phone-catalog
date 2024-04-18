import { Outlet } from 'react-router-dom';
import { Footer } from './pages/Footer/Footer';
import { Header } from './pages/Header/Header';
import './App.scss';
import React from 'react';

export const App = () => {
  return (
    <>
      <Header />
      <div className="App">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
