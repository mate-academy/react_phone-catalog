import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useMyContext } from '../../Contexts.tsx/ProductContexts';

export const NavBar: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useMyContext();

  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        <Link
          to="/"
          className={styles.logo_link}
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <img
            className={styles.logo_image}
            src="img/Additional images/icons/Logo.svg"
            alt="logo_nice"
          />
        </Link>
      </div>
      <button
        className={styles.burger}
        onClick={() => {
          setIsMenuOpen(prev => !prev);
        }}
      >
        <img
          className={styles.burger_image}
          src={
            isMenuOpen
              ? 'img/Additional images/icons/white cross.svg'
              : 'img/Additional images/icons/burger.svg'
          }
          alt={isMenuOpen ? 'Open menu' : 'Close menu'}
        />
      </button>
    </div>
  );
};
