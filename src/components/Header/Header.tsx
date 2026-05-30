import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { IconLinks } from './components/IconLinks/IconLinks';
import { MobileMenu } from './components/MobileMenu/MobileMenu';

const LOGO = 'img/header/header__logo.png';
const LOGO_SMALL = 'img/header/header__logo-small.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [size, setSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = size <= 639;
  const [scrolled, setScrolled] = useState(false);

  const logoLink = size < 1199 ? LOGO_SMALL : LOGO;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles['header--scrolled'] : ''}`}
    >
      <div className={styles.header__container}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.header__logo} ${styles['header__logo--active']}`
              : styles.header__logo
          }
        >
          <img
            src={logoLink}
            alt="nice gadgets logo"
            className={styles.header__img}
            width="80px"
          />
        </NavLink>

        {isMobile ? (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.header__menuIcon}
          >
            <img
              src={
                isMenuOpen ? 'img/icons/close-active.svg' : 'img/icons/menu.svg'
              }
              alt={isMenuOpen ? 'close' : 'open'}
            />
          </button>
        ) : (
          <>
            <Navigation className="navigation" setIsMenuOpen={setIsMenuOpen} />
            <IconLinks
              mainClass={['headerLinks']}
              linkClass={['headerLink']}
              iconClass={['headerIcon']}
            />
          </>
        )}
      </div>
      {isMenuOpen && isMobile && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
    </header>
  );
};
