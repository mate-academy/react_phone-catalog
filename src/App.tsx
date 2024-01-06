import { Outlet } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Heder/Header';
import { Footer } from './components/Footer';

export const App = () => (
  <>
    <Header />
    <main className="main container">
      <Outlet />
    </main>
    <Footer />
  </>
);
