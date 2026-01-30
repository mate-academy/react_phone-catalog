import './App.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@modules/shared/components/Header';
import { Footer } from '@modules/shared/components/Footer';
import { Sidebar } from '@modules/shared/components/Sidebar';

export const tabs = [
  { title: 'Home', link: '/home' },
  { title: 'Phones', link: '/phones' },
  { title: 'Tablets', link: '/tablets' },
  { title: 'Accessories', link: '/accessories' },
];

export const App: React.FC = () => {
  return (
    <div className="App">
      <Sidebar />

      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};
