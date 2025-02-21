import { NavLink, useLocation } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useState } from 'react';
import { Burger } from '../BurgerMenu/BurgerMenu';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useAppSelector } from '../../app/hooks';

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { width } = useWindowSize();
  const { products: cartItem } = useAppSelector(state => state.cart);
  const { products: favoriteItem } = useAppSelector(state => state.favorite);
  const location = useLocation();
  const links = ['Phones', 'Tablets', 'Accessories'];

  const checkIsActive = (category: string) => {
    const searchParams = new URLSearchParams(location.search);

    return searchParams.get('category') === category;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.nav}>
      {width < 640 ? (
        <Burger isOpen={isMenuOpen} onClick={toggleMenu} />
      ) : (
        <>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles.link_active}`
                    : styles.link
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            {links.map(link => (
              <li key={link}>
                <NavLink
                  className={
                    checkIsActive(link.toLowerCase())
                      ? `${styles.link} ${styles.link_active}`
                      : styles.link
                  }
                  to={`/products?category=${link.toLowerCase()}`}
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={styles.nav__icons}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.icon} ${styles.link_active}` : styles.icon
              }
              to="/favorite"
            >
              <div>
                <img src="/react_phone-catalog/img/servic/heart.svg" alt=""></img>
                {!!favoriteItem.length && <span>{favoriteItem.length}</span>}
              </div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.icon} ${styles.link_active}` : styles.icon
              }
              to="/cart"
            >
              <div>
                <img src="/react_phone-catalog/img/servic/cart.svg" alt=""></img>
                {!!cartItem.length && <span>{cartItem.length}</span>}
              </div>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};
