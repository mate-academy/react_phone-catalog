import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useMyContext } from '../../Context/ProductContexts';
import { useMediaQuery } from '../../Services/UseMediaQuery';
import { breakpoints } from '../../Services/MediaBreakpoints';
import { SavedGoods } from '../SavedGoods';

export const NavBar: React.FC = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    products,
    heartIsPressed,
    setFavoriteNumber,
  } = useMyContext();
  const location = useLocation();

  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`);
  const links = [
    { path: '/', title: 'Home' },
    { path: '/phones', title: 'phones' },
    { path: '/tablets', title: 'tablets' },
    { path: '/accessories', title: 'accessories' },
  ];

  useEffect(() => {
    let favoriteCount = 0;

    products.forEach(product => {
      if (localStorage.getItem(product.itemId)) {
        favoriteCount++;
      }
    });

    setFavoriteNumber(favoriteCount);
  }, [products, heartIsPressed]);

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
      {!isTablet ? (
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
      ) : (
        <div className={styles.navBar_options}>
          <ul className={styles.navBar_list}>
            {links.map(link => (
              <li key={link.title}>
                <Link
                  to={link.path}
                  className={`${styles.navBar_link} ${
                    location.pathname === link.path ? styles.isActive : ''
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <SavedGoods />
        </div>
      )}
    </div>
  );
};
