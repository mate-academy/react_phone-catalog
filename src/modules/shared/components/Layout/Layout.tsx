import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Menu } from '../Header/components/Menu';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../../context/AppContext';

const MIN_TABLET_SCREEN_SIZE = 640;

export const Layout = () => {
  const { favoritesIds, addBtnIds } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getArrayLength = (array: number[]) => {
    return array.length;
  };

  // This allows you to close the navigation menu if the screen width
  // accidentally becomes equal to or greater than the tablet's screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MIN_TABLET_SCREEN_SIZE) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMenuOpen]);

  return (
    <div>
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        favoritesCounter={getArrayLength(favoritesIds)}
        cartCounter={getArrayLength(addBtnIds)}
      />
      <main>
        {isMenuOpen ? (
          <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};
