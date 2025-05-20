import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import React from 'react';
import { useGlobalState } from '../../shared/constants/GlobalContext';

type Props = {
  toggleMenu?: () => void;
};

export const Navigation: React.FC<Props> = ({ toggleMenu }) => {
  const { state } = useGlobalState();

  const cartAmount = state.cart.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );

  return (
    <div className={styles.Navigation}>
      <div className={styles.navLinkTop}>
        <NavLink
          onClick={toggleMenu}
          to={'/'}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          onClick={toggleMenu}
          to={'/phones'}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Phones
        </NavLink>
        <NavLink
          onClick={toggleMenu}
          to={'/tablets'}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Tablets
        </NavLink>
        <NavLink
          onClick={toggleMenu}
          to={'/accessories'}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Accessories
        </NavLink>
      </div>
      <div className={styles.navLinkBottom}>
        <NavLink
          onClick={toggleMenu}
          to={'/favorites'}
          className={({ isActive }) =>
            `${styles.navLinkBottom__Item} ${isActive ? styles.navLinkBottom__ItemActive : ''}`
          }
        >
          <img src="img/icons/Favourites-Heart-Like.svg" alt="favorites" />
          <div className={styles.navLinkBottom__counter}>
            {state.favorites.length}
          </div>
        </NavLink>
        <NavLink
          onClick={toggleMenu}
          to={'/cart'}
          className={({ isActive }) =>
            `${styles.navLinkBottom__Item} ${isActive ? styles.navLinkBottom__ItemActive : ''}`
          }
        >
          <img src="img/icons/Shopping-Cart.svg" alt="shopping cart" />
          <div className={styles.navLinkBottom__counter}>{cartAmount}</div>
        </NavLink>
      </div>
    </div>
  );
};
