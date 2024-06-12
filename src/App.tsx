import React from 'react';
import { Outlet } from 'react-router-dom';
import './helpers/style/normalize.css';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <ScrollToTop />

      <div className="app__outlet">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
