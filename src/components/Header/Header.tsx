import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(screen.width);
  const [isMobile, setIsMobile] = useState(screenWidth < 640);
  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen(prevState => {
        const newState = !prevState;

        document.body.style.overflowY = newState ? 'hidden' : 'auto';

        return newState;
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = screen.width;

      setScreenWidth(newScreenWidth);
      setIsMobile(newScreenWidth < 640);

      if (!isMobile) {
        document.body.style.overflowY = 'auto';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <>
      <div id="top" className={styles.Header}>
        <div className={styles.Header__logoWrapper}>
          <Link to={'/'} onClick={goToTop}>
            <img
              src="img/icons/Logo.svg"
              alt="company logo"
              className={styles.Header__logo}
            />
          </Link>
        </div>

        <div className={styles.Header__navWrapper}>
          <Navigation />
        </div>

        <div className={styles.Header__burgerWrapper}>
          <Link to="#" onClick={toggleMenu}>
            <img
              src="img/icons/Menu.svg"
              alt="burger menu"
              className={styles.Header__burger}
            />
          </Link>
        </div>
      </div>
      {isMenuOpen && isMobile && (
        <>
          <div className={styles.Backdrop}></div>
          <Navigation toggleMenu={toggleMenu} />
        </>
      )}
    </>
  );
};
