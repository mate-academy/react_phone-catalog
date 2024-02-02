import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App: React.FC = () => (
  <div className="App">
    <Header />

    <div className="main-content">
      <div className="main-content__container">
        <Outlet />
      </div>
    </div>

    <Footer />
  </div>
);
