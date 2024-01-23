import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage/HomePage';

export const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <HomePage />
  </BrowserRouter>
);
