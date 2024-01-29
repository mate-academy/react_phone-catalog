import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App: React.FC = () => (
  <div className="App">
    <Header />

    <div style={{ height: 1000 }}>
      <Outlet />
    </div>

    <Footer />
  </div>
);
