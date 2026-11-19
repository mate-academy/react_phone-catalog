import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

export const App: React.FC = () => (
  <div className="app">
    <Header />
    <main className="app__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);
