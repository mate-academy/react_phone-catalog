import React, { useState } from 'react';
import '../../styles/App.scss';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';

const AppLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOpenMenu() {
    setIsMenuOpen(true);
    document.documentElement.style.overflow = 'hidden';
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
    document.documentElement.style.overflow = 'auto';
  }

  return (
    <>
      <Header onOpenMenu={handleOpenMenu} />
      <Menu isMenuOpen={isMenuOpen} onCloseMenu={handleCloseMenu} />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
