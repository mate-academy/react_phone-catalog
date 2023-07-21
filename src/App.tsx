import React from 'react';
import { Outlet as Main } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import './App.scss';

export const App: React.FC = () => (
  <div className="app">
    <Header />
    <Main />
    <Footer />
  </div>
);
