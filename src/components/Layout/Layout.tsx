import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';
import layout from './Layout.module.scss';
import { useEffect, useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // hook для відслідковування розміру екрану
  function useMedia(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);

      const handler = () => setMatches(media.matches);

      handler();

      media.addEventListener('change', handler);

      return () => media.removeEventListener('change', handler);
    }, [query]);

    return matches;
  }
  // кінець hook

  const isMobile = useMedia('(max-width: 639px)');

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <div className={layout.layout}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && isMobile ? (
        <BurgerMenu setIsMenuOpen={setIsMenuOpen} />
      ) : (
        <>
          <main className={layout.layout__main}>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};
