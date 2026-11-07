import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/navLinks';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { IconWithCounter } from '../IconWithCounter';
import HeartIcon from '../../../../assets/icons/heart.svg?react';
import CartIcon from '../../../../assets/icons/cart.svg?react';
import styles from './BurgerMenu.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, { [styles.active]: isActive });

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconLink, { [styles.active]: isActive });

export const BurgerMenu = ({ isOpen, onClose }: Props) => {
  const { favorites } = useFavorites();
  const { totalQuantity } = useCart();

  return (
    <div className={classNames(styles.menu, { [styles.open]: isOpen })}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {NAV_LINKS.map(({ to, title }) => (
            <li key={to}>
              <NavLink to={to} className={getLinkClass} onClick={onClose}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <NavLink
          to="/favorites"
          className={getIconLinkClass}
          aria-label="Favourites"
          onClick={onClose}
        >
          <IconWithCounter count={favorites.length}>
            <HeartIcon />
          </IconWithCounter>
        </NavLink>

        <NavLink
          to="/cart"
          className={getIconLinkClass}
          aria-label="Cart"
          onClick={onClose}
        >
          <IconWithCounter count={totalQuantity}>
            <CartIcon />
          </IconWithCounter>
        </NavLink>
      </div>
    </div>
  );
};
