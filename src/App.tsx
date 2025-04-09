import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';

export const App = () => {
  return (
    <div className="app">
      <Modal />
      <Header />
      <Menu />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
