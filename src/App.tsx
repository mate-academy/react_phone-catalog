/* eslint-disable max-len */
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  return (
    <div className="page">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
