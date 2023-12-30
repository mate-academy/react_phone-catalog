import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export const App: React.FC = () => (
  <div className="App">
    <Header />

    <body>
      <div className="App__main">
        <Outlet />
      </div>
    </body>

    <Footer />
  </div>
);
