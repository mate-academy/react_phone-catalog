import frame from './Frame.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Menu } from '../Menu/Menu';
import { useState } from 'react';

export const Frame = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header setIsMenuOpen={setIsMenuOpen} />

      {isMenuOpen ? (
        <Menu />
      ) : (
        <>
          <main className={frame.main}>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
