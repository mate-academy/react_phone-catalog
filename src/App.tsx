import './App.scss';
import './shared/colors.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Breadcrumbs />
      <Outlet />
      <Footer />
    </div>
  );
};
