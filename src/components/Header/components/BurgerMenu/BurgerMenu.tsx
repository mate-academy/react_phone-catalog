import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './BurgerMenu.module.scss';

import favIcon from '../../../../icons/Favourites.png';
import cartIcon from '../../../../icons/Shopping-bag.png';
import { CartContext } from '../../../../providers/CartProvider';
import { FavoritesContext } from '../../../../providers/FavoritesProvider';
import { useContext } from 'react';
import { HeaderIconItem } from '../HeaderIconItem/HeaderIconItem';

interface Props {
  isOpen: boolean;
  closeMenu: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ isOpen, closeMenu }) => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.burgerMenu__link, {
      [styles['burgerMenu__link--active']]: isActive,
    });

  return (
    <>
      {isOpen && (
        <div className={styles.burgerMenu}>
          <nav className={styles.burgerMenu__nav}>
            <ul className={styles.burgerMenu__menu}>
              <li className={styles.burgerMenu__menuItem}>
                <NavLink to="/" className={getLinkClass} onClick={closeMenu}>
                  Home
                </NavLink>
              </li>

              <li className={styles.burgerMenu__menuItem}>
                <NavLink
                  to="/phones"
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  Phones
                </NavLink>
              </li>

              <li className={styles.burgerMenu__menuItem}>
                <NavLink
                  to="/tablets"
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  Tablets
                </NavLink>
              </li>

              <li className={styles.burgerMenu__menuItem}>
                <NavLink
                  to="/accessories"
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.burgerMenu__menuSubItem}>
            <HeaderIconItem
              to="/favorite"
              img={favIcon}
              count={favorites.length}
              className={classNames(
                styles.icons__icon,
                styles['icons__icon--type-like'],
              )}
              activeClass={styles['icons__icon--active']}
              countClass={styles.icons__count}
              onClick={closeMenu}
            />

            <HeaderIconItem
              to="/cart"
              img={cartIcon}
              count={cart.length}
              className={classNames(
                styles.icons__icon,
                styles['icons__icon--type-cart'],
              )}
              activeClass={styles['icons__icon--active']}
              countClass={styles.icons__count}
              onClick={closeMenu}
            />
          </div>
        </div>
      )}
    </>
  );
};
