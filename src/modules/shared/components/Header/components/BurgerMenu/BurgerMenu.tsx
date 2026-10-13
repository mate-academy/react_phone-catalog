import classNames from 'classnames';
import styles from './BurgerMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { useFav } from '../../../../../../context/FavouritesContext';
import { useCart } from '../../../../../../context/CartContext';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ onClose, isOpen }) => {
  const { items } = useCart();
  const { favItems } = useFav();

  const setLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.nav__link, {
      [styles['nav__link--active']]: isActive,
    });
  };

  const setFavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.menu__fav, {
      [styles['menu__fav--active']]: isActive,
    });
  };

  const setCartLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.menu__cart, {
      [styles['menu__cart--active']]: isActive,
    });
  };

  return (
    <aside className={classNames(styles.menu, { [styles.menu__open]: isOpen })}>
      <div className={styles.menu__top}>
        <a className={styles.menu__logo} href="/">
          <img
            className={styles.menu__logo_img}
            src="img/logo/Logo-dark.svg"
            alt="Nice Gadgets Logo"
          />
        </a>

        <div className={styles.menu__close} onClick={onClose}>
          <img src="img/icons/Close.svg" alt="Close" />
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <NavLink to={'/'} end className={setLinkClass} onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink to={'/phones'} className={setLinkClass} onClick={onClose}>
              Phones
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink to={'/tablets'} className={setLinkClass} onClick={onClose}>
              Tablets
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink
              to={'/accessories'}
              className={setLinkClass}
              onClick={onClose}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__bottom}>
        <NavLink
          to={'/favourites'}
          className={setFavLinkClass}
          onClick={onClose}
        >
          <img
            className={styles.menu__fav_icon}
            src="img/icons/Favourites.svg"
            alt="Favourites"
          />
          {favItems.length > 0 && (
            <div className={styles.menu__fav_counter}>{favItems.length}</div>
          )}
        </NavLink>
        <div className={styles.menu__divider}></div>
        <NavLink to={'/cart'} className={setCartLinkClass} onClick={onClose}>
          <img
            className={styles.menu__cart_icon}
            src="img/icons/Cart.svg"
            alt="Cart"
          />
          {items.length > 0 && (
            <div className={styles.menu__cart_counter}>{items.length}</div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
