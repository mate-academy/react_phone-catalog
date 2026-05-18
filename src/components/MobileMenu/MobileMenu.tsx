import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import styles from './MobileMenu.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { to: '/', text: 'Home' },
  { to: '/phones', text: 'Phones' },
  { to: '/tablets', text: 'Tablets' },
  { to: '/accessories', text: 'Accessories' },
];

export const MobileMenu = ({ isOpen, onClose }: Props) => {
  const cartItems = useAppSelector(state => state.cart.items);
  const favoritesItems = useAppSelector(state => state.favorites.items);

  const cartTotalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const favTotalQuantity = favoritesItems.length;

  return (
    <aside className={cn(styles.menu, { [styles['menu--open']]: isOpen })}>
      <nav className={styles.menu__nav}>
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(styles.menu__link, {
                [styles['menu__link--active']]: isActive,
              })
            }
            onClick={onClose}
          >
            {link.text}
          </NavLink>
        ))}
      </nav>

      <div className={styles.menu__footer}>
        <NavLink
          to="/favorites"
          onClick={onClose}
          className={({ isActive }) =>
            cn(styles.menu__icon_wrap, {
              [styles['menu__icon_wrap--active']]: isActive,
            })
          }
        >
          <img src="/img/heart.png" alt="Favorites" />
          {favTotalQuantity > 0 && (
            <span className={styles.menu__badge}>{favTotalQuantity}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          onClick={onClose}
          className={({ isActive }) =>
            cn(styles.menu__icon_wrap, {
              [styles['menu__icon_wrap--active']]: isActive,
            })
          }
        >
          <img src="/img/bag.png" alt="Cart" />
          {cartTotalQuantity > 0 && (
            <span className={styles.menu__badge}>{cartTotalQuantity}</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
