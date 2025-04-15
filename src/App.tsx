import { Outlet } from 'react-router-dom';
import './App.scss';
import React from 'react';
import { Header } from './components/Header/Header';

export const App: React.FC = () => (
  <>
    <Header />
    <div className="App">
      <Outlet />
    </div>
  </>
);
