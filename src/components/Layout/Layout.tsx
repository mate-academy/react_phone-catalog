import { Footer } from '../Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';

const MOBILE_QUERY = '(max-width: 639px)';

export const Layout = () => {
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);

    const handleChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        setIsMobileOpened(false);
      }
    };

    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      <Header
        isMenuOpened={isMobileOpened}
        onToggleMenu={() => setIsMobileOpened(prev => !prev)}
      />
      <Outlet />
      <Footer />

      <BurgerMenu
        isOpened={isMobileOpened}
        onToggle={() => setIsMobileOpened(false)}
      />
    </>
  );
};
