// NavBar.js
import { useState } from 'react';
import styles from './NavBar.module.scss';
import Logo from '../Logo/Logo';
import BurgerMenuIcon from '../BurgerMenuIcon/BurgerMenuIcon';
import SearchIcon from '../SearchIcon/SearchIcon';
import CrossIcon from '../CrossIcon/CrossIcon';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavLinkItem from '../NavLinkItem/NavLinkItem';
import NavIcons from '../NavIcons/NavIcons';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navbar__list}>
          <Logo />
          <NavLinkItem to="/">HOME</NavLinkItem>
          <NavLinkItem to="/phones">PHONES</NavLinkItem>
          <NavLinkItem to="/tablets">TABLETS</NavLinkItem>
          <NavLinkItem to="/accessories">ACCESSORIES</NavLinkItem>
        </ul>

        <NavIcons />

        <div className={styles.navbar__burgerMenuIcons}>
          <SearchIcon
            className={`${styles.navbar__burgerMenuIcon} ${styles['navbar__burgerMenuIcon--search']}`}
          />
          <div className={styles.navbar__burgerMenuIcon} onClick={toggleMenu}>
            {isMenuOpen ? <CrossIcon /> : <BurgerMenuIcon />}
          </div>
        </div>

        {isMenuOpen && <BurgerMenu />}
      </nav>
    </>
  );
};

export default NavBar;
