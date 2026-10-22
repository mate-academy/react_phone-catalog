import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';

import './App.scss';
import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
