import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <main style={{ flexGrow: 1, background: '#fafbfc' }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
