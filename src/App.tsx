import React from 'react';
import { Outlet as Main } from 'react-router-dom';

import { Header } from './components/Header/Header';
import './App.scss';

export const App: React.FC = () => (
  <div className="app">
    <Header />
    <Main />
  </div>
);
