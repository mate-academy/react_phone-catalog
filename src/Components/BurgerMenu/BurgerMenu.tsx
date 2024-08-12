import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './BurgerMenu.module.scss';
import { Context } from '../../Store/Store';

interface BurgerMenuProps {
  toggleMenu: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ toggleMenu }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames([styles.item], {
      [styles.isActive]: isActive,
    });

  const getLinkClassForEnd = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.bottomItem, {
      [styles.isActiveForEnd]: isActive,
    });

  const { favorite, carts } = useContext(Context);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className="logo">
          <NavLink to="/">
            <img src="img/icons/Logo.png" alt="" className="logo-img" />
          </NavLink>
        </div>
        <div className={styles.close} onClick={toggleMenu}>
          <img src="img/icons/Close.svg" alt="favorites" />
        </div>
      </div>
      <ul className={styles.link}>
        <li className={styles.linkItem}>
          <NavLink className={getLinkClass} to="/" onClick={toggleMenu}>
            Home
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink className={getLinkClass} to="/phones" onClick={toggleMenu}>
            Phones
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink className={getLinkClass} to="/tables" onClick={toggleMenu}>
            Tablets
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink className={getLinkClass} to="/smart" onClick={toggleMenu}>
            Accessories
          </NavLink>
        </li>
      </ul>
      <div className={styles.bottom}>
        <NavLink
          className={getLinkClassForEnd}
          to="/favorites"
          onClick={toggleMenu}
        >
          <div className={styles.icons}>
            <img src="img/icons/favourites_icon.svg" alt="favorites" />
            {favorite.length !== 0 && (
              <span className={styles.counter}>{favorite.length}</span>
            )}
          </div>
        </NavLink>
        <NavLink className={getLinkClassForEnd} to="/cart" onClick={toggleMenu}>
          <div className={styles.icons}>
            <img src="img/icons/cart_icon.svg" alt="cart" />
            {carts.length !== 0 && (
              <span className={styles.counter}>{carts.length}</span>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
