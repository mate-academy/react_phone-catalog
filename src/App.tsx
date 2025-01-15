import React from 'react';
import './App.scss';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
    </div>
  );
};
