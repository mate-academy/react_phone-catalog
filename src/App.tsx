import React from 'react';
import './App';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div className="App">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);
