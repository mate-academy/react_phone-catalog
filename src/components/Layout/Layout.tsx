import React, { useState } from 'react';

import { Header } from '../Header';
import { Aside } from '../Aside';
import { Footer } from '../Footer';

import styles from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsAsideOpen(prev => !prev);
  };

  const handleCloseAside = () => {
    setIsAsideOpen(false);
  };

  return (
    <>
      <Header onBurgerClick={handleBurgerClick} isAsideOpen={isAsideOpen} />

      <Aside isOpen={isAsideOpen} onClose={handleCloseAside} />

      <main className={styles.content}>{children}</main>

      <Footer />
    </>
  );
};
