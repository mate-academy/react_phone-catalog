import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Nav } from './Nav/Nav';
import { Burger } from './Burger/Burger';
import { useState } from 'react';
import { Aside } from './Aside/Aside';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`${styles.header}`}>
      <Link to="/" className={styles.header__link}>
        <img
          src="img/imagess/Logo.png"
          alt=""
          className={styles.header__link__logo}
        />
      </Link>

      <Nav />

      {isOpen ? (
        <Aside toggleMenu={toggleMenu} />
      ) : (
        <Burger toggleMenu={toggleMenu} />
      )}
    </header>
  );
};
