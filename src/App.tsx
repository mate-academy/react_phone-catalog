/* eslint-disable prettier/prettier */

import { Outlet } from 'react-router-dom';
import './App.scss';

import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

export const App = () => (
  <div className="App">
    <Header />

    <main style={{
      backgroundColor: '#FAFBFC',
      paddingBottom: '80px',
    }}>
      <Outlet />
    </main>

    <Footer />
  </div>
);
