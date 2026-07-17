export type NavbarProps = Record<string, never>;
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from './navLinks';
import hamburgerIcon from '../../../../assets/icons/Menu.svg';
import closeIcon from '../../../../assets/icons/Close.svg';
import logo from '../../../../assets/logo.svg';
import styles from './Navbar.module.scss';
import { MobileMenu } from './components/MobileMenu';
import { FavButton } from '../FavButton';
import { CartButton } from '../CartButton';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <img src={logo} alt="Logo" className={styles.navbar__logoImage} />
        </div>
        <div className={styles.navLinks}>
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} className={styles.link}>
              {label}
            </NavLink>
          ))}
        </div>
        <button
          className={styles.navbar__menuButton}
          onClick={handleMenuToggle}
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <img src={isMenuOpen ? closeIcon : hamburgerIcon} alt="Menu" />
        </button>
        <div className={styles.navbar__BtnContainer}>
        <FavButton />
        <CartButton />
      </div>
      </nav>
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
      
    </>
  );
};
