import styles from './AsideMenu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { CartItems } from '../../types/CartItems';
import { Product } from '../../types/Product';

type Props = {
  isMenuOpen: boolean;
  handleMenuVisibility: () => void;
  likeIcon: string;
  cartIcon: string;
  favourites: Product[];
  cart: CartItems[];
};

export const AsideMenu: React.FC<Props> = ({
  isMenuOpen,
  handleMenuVisibility,
  likeIcon,
  cartIcon,
  favourites,
  cart,
}) => {
  return (
    <aside
      className={classNames(styles.asideMenu, {
        [styles.menuOpen]: isMenuOpen,
      })}
      aria-expanded={isMenuOpen}
    >
      <nav className={styles.nav}>
        <NavLink
          to="/"
          onClick={handleMenuVisibility}
          className={({ isActive }) =>
            classNames(styles.navItem, { [styles.isActive]: isActive })
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          onClick={handleMenuVisibility}
          className={({ isActive }) =>
            classNames(styles.navItem, { [styles.isActive]: isActive })
          }
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          onClick={handleMenuVisibility}
          className={({ isActive }) =>
            classNames(styles.navItem, { [styles.isActive]: isActive })
          }
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          onClick={handleMenuVisibility}
          className={({ isActive }) =>
            classNames(styles.navItem, { [styles.isActive]: isActive })
          }
        >
          Accessories
        </NavLink>
      </nav>

      <div className={styles.actions}>
        <NavLink
          to="/favourites"
          onClick={handleMenuVisibility}
          className={({ isActive }) =>
            classNames(styles.actionsItem, { [styles.isActive]: isActive })
          }
        >
          <div className={styles.actionsIcon}>
            <img src={likeIcon} alt="like" />

            {favourites.length > 0 && (
              <span className={styles.productCount}>
                <p className={styles.productCountNumbers}>
                  {favourites.length}
                </p>
              </span>
            )}
          </div>
        </NavLink>

        <NavLink
          to="/cart"
          onClick={handleMenuVisibility}
          className={({ isActive }) =>
            classNames(styles.actionsItem, { [styles.isActive]: isActive })
          }
        >
          <div className={styles.actionsIcon}>
            <img src={cartIcon} alt="cart" />

            {cart.length > 0 && (
              <span className={styles.productCount}>
                <p className={styles.productCountNumbers}>{cart.length}</p>
              </span>
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
