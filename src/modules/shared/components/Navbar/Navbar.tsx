export type NavbarProps = Record<string, never>;
import { useState } from 'react';
import hamburgerIcon from '../../../../assets/icons/Menu.svg';
import closeIcon from '../../../../assets/icons/Close.svg';
import logo from '../../../../assets/logo.svg';
import styles from './Navbar.module.scss';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <img src={logo} alt="Logo" className={styles.navbar__logoImage} />
      </div>
      <button
        className={styles.navbar__menuButton}
        onClick={() => setIsMenuOpen(prev => !prev)}
        type="button"
      >
        <img src={isMenuOpen ? closeIcon : hamburgerIcon} alt="Menu" />
      </button>
    </nav>
  );
};
