import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import './utils/resetting.css';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};
