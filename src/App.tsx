import { Outlet } from 'react-router-dom';
import './App.scss';
import React from 'react';

export const App = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};
