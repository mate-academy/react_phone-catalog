export type NavbarProps = Record<string, never>;
import { useState } from 'react';
import hamburgerIcon from '../../../../assets/icons/Menu.svg';
import closeIcon from '../../../../assets/icons/Close.svg';
import logo from '../../../../assets/logo.svg';
import styles from './Navbar.module.scss';
import { MobileMenu } from './components/MobileMenu';

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
        <button
          className={styles.navbar__menuButton}
          onClick={handleMenuToggle}
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <img src={isMenuOpen ? closeIcon : hamburgerIcon} alt="Menu" />
        </button>
      </nav>
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
};
