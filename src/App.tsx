import './App.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => (
  <div className="App">
    <Header />

    <main className="main">
      <div className="main__container">
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);
