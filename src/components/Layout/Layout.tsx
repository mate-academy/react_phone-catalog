import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';
import { MenuMobile } from '../MenuMobile/MenuMobile';
import { productsAsync } from '../../features/productsSlice';

export const Layout: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (windowWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(productsAsync());
  }, []);

  return (
    <PhoneCatalogContext.Provider value={{
      windowWidth,
      isMobile,
      isMenuClicked,
      setIsMenuClicked,
    }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />

      <MenuMobile />
    </PhoneCatalogContext.Provider>
  );
};
