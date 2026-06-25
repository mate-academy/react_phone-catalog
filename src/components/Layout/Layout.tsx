import { Footer } from '../Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';
import styles from './Layout.module.scss';

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
    <div className={styles.layout}>
      <Header
        isMenuOpened={isMobileOpened}
        onToggleMenu={() => setIsMobileOpened(prev => !prev)}
      />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />

      <BurgerMenu
        isOpened={isMobileOpened}
        onToggle={() => setIsMobileOpened(false)}
      />
    </div>
  );
};
