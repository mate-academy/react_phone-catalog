import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import './Buttons.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ContextProviders } from './components/ContextProviders';

export const App: FC = () => {
  return (
    <ContextProviders>
      <Header />

      <div className="main">
        <Outlet />
      </div>

      <Footer />
    </ContextProviders>
  );
};
