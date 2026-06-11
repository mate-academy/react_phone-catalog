/* eslint-disable prettier/prettier */

import { Outlet } from 'react-router-dom';

import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

import './App.scss';

export const App = () => (
  <div className="App">
    <Header />

    <main className="main-content">
      <div className="container">
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);
