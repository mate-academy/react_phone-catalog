import React from 'react';
import styles from './BurgerMenu.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export const Burger: React.FC<Props> = ({ isOpen, onClick }) => {
  const { products: cartItem } = useAppSelector(state => state.cart);
  const { products: favoriteItem } = useAppSelector(state => state.favorite);
  const location = useLocation();
  const links = ['Phones', 'Tablets', 'Accessories'];

  const checkIsActive = (category: string) => {
    return location.search === `?category=${category}`;
  };

  return (
    <div>
      <div className={styles.burger} onClick={onClick}>
        <div
          className={`${styles.burger__line} ${
            isOpen ? styles.burger__line_transform : ''
          }`}
        ></div>
        <div
          className={`${styles.burger__line} ${
            isOpen ? styles.burger__line_hidden : ''
          }`}
        ></div>
        <div
          className={`${styles.burger__line} ${
            isOpen ? styles.burger__line_transform : ''
          }`}
        ></div>
      </div>
      <div className={isOpen ? styles.content : styles.none}>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.link_active}` : styles.link
              }
              to="/"
              onClick={onClick}
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
                onClick={onClick}
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
            to="/cart"
          >
            <div>
              <img src="/img/servic/heart.svg" alt=""></img>
              {favoriteItem.length > 0 && <span>{favoriteItem.length}</span>}
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.icon} ${styles.link_active}` : styles.icon
            }
            to="/prefer"
          >
            <div>
              <img src="/img/servic/cart.svg" alt=""></img>
              {cartItem.length > 0 && <span>{cartItem.length}</span>}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
