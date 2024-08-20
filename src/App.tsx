import React from 'react';
import './App.scss';
import './utils/resetStyles.css';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};
