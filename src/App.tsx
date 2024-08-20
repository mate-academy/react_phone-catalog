import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NavMobile from './components/NavMobile/NavMobile';
import { useProduct } from './store/Store';

export const App: React.FC = () => {
  const { isOpen } = useProduct();

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return (
    <div className="App">
      <Header />
      <NavMobile />

      <Outlet />

      <Footer />
    </div>
  );
};
