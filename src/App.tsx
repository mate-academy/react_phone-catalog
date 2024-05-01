import React, { memo } from 'react';
import './styles/index.scss';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

export const App: React.FC = memo(() => (
  <div className="App">
    <Header />

    <main className="main">
      <Outlet />
    </main>

    <Footer />
  </div>
));
