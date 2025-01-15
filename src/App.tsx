import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
