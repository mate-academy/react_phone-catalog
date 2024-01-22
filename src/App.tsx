import React from 'react';
import './index.scss';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export const App: React.FC = () => (
  <div className="App">
    <Header />

    <main className="main">
      <Outlet />
    </main>

  </div>
);
