import './App.scss';
import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {

  return (
    <div className="page">
      <Header />

      <div className='App'>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
