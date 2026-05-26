import React from 'react';

import './App.scss';

import { Outlet } from 'react-router-dom';

import { Header } from './components/Header/Header';

import { Footer } from './components/Footer/Footer';

import { ScrollToTop } from './components/ScrollToTop';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <ScrollToTop />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
