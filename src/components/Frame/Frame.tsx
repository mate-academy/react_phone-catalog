import frame from './Frame.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Menu } from '../Menu/Menu';
import { useEffect, useState } from 'react';

export const Frame = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const media = window.matchMedia('(max-width: 639px)');
  const [isMobile, setIsMobile] = useState(media.matches);

  useEffect(() => {
    const handler = () => setIsMobile(media.matches);

    media.addEventListener('change', handler);

    return () => media.removeEventListener('change', handler);
  }, []);

  return (
    <div id="top">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {isMenuOpen && isMobile ? (
        <Menu setIsMenuOpen={setIsMenuOpen} />
      ) : (
        <>
          <main className={frame.main}>
            <div className="frame">
              <Outlet />
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};
