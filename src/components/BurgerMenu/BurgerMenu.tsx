import React from 'react';
import styles from './BurgerMenu.module.scss';
import { Logo } from '../Logo';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

type Props = {
  onClose: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ onClose }) => {
  const { isMenuOpen, cartProductsIds, favouriteProductsIds } = useAppContext();

  return (
    <header className={`${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`}>
      <div className={styles.topbar}>
        <Logo location='navbar' />
        <button
          onClick={onClose}
          className={styles.crossContainer}
        >
          <img
            className={styles.img}
            src="/img/icons/cross.svg" alt="Cross"
          />
        </button>
      </div>

      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink
                onClick={onClose}
                to="/"
                className={({ isActive }) =>
                  `${styles.item} uppercaseText${isActive ? ` ${styles.activeLink}` : ''}`
                }
              >
                home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClose}
                to="/phones"
                className={({ isActive }) =>
                  `${styles.item} uppercaseText${isActive ? ` ${styles.activeLink}` : ''}`
                }
              >
                phones
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClose}
                to="/tablets"
                className={({ isActive }) =>
                  `${styles.item} uppercaseText${isActive ? ` ${styles.activeLink}` : ''}`
                }
              >
                tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClose}
                to="/accessories"
                className={({ isActive }) =>
                  `${styles.item} uppercaseText${isActive ? ` ${styles.activeLink}` : ''}`
                }
              >
                accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.icons}>
          <NavLink
            onClick={onClose}
            to={'/favorites'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? `${styles.activeLink}` : ''} ${styles.heart}`
            }
          >
            <img
              className={styles.img}
              src="/img/icons/Heart.svg" alt="Heart"
            />

            {favouriteProductsIds.length > 0 && (
              <NavLink
                to={'/favourite'}
                className={styles.counter}>
                {favouriteProductsIds.length}
              </NavLink>
            )}
          </NavLink>
          <NavLink
            onClick={onClose}
            to={'/cart'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? `${styles.activeLink}` : ''}`
            }
          >
            <img
              className={styles.img}
              src="/img/icons/Cart.svg" alt="Cart"
            />

            {cartProductsIds.length > 0 && (
              <NavLink
                to={'/cart'}
                className={styles.counter}>
                {cartProductsIds.length}
              </NavLink>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
