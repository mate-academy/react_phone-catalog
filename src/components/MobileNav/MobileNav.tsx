import React from 'react';
import styles from './MobileNav.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { CartIcon, FavouriteIcon } from '../../helpers/icons';

export const MobileNav = () => {
  const { favouriteProducts, cart, setIsMobileMenu } =
    React.useContext(AppContext);

  const [favouriteCounter, setFavouriteCounter] = React.useState(
    favouriteProducts.length,
  );
  const [cartCounter, setCartCounter] = React.useState(
    cart.reduce((acc, item) => acc + item.quantity, 0),
  );

  React.useEffect(
    () => setFavouriteCounter(favouriteProducts.length),
    [favouriteProducts],
  );

  React.useEffect(
    () => setCartCounter(cart.reduce((acc, item) => acc + item.quantity, 0)),
    [cart],
  );

  const handleNavLinkClick = () => {
    setIsMobileMenu(false);
  };

  return (
    <nav className={styles.main}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              classNames(styles.link, isActive ? styles['item--active'] : '')
            }
            onClick={handleNavLinkClick}
          >
            Home
          </NavLink>
        </li>

        <li className={styles.item}>
          <NavLink
            to="/phones"
            className={({ isActive }: { isActive: boolean }) =>
              classNames(styles.link, isActive ? styles['item--active'] : '')
            }
            onClick={handleNavLinkClick}
          >
            Phones
          </NavLink>
        </li>

        <li className={styles.item}>
          <NavLink
            to="/tablets"
            className={({ isActive }: { isActive: boolean }) =>
              classNames(styles.link, isActive ? styles['item--active'] : '')
            }
            onClick={handleNavLinkClick}
          >
            Tablets
          </NavLink>
        </li>

        <li className={styles.item}>
          <NavLink
            to="/accessories"
            className={({ isActive }: { isActive: boolean }) =>
              classNames(styles.link, isActive ? styles['item--active'] : '')
            }
            onClick={handleNavLinkClick}
          >
            Accessories
          </NavLink>
        </li>
      </ul>

      <div className={styles.bottomBar}>
        <NavLink
          to="/favourites"
          className={({ isActive }: { isActive: boolean }) =>
            classNames(
              styles.button,
              isActive ? styles['favourite--active'] : styles.favourite,
            )
          }
          onClick={handleNavLinkClick}
        >
          <FavouriteIcon />
          {!!favouriteCounter && (
            <span className={styles.counter}>{favouriteCounter}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }: { isActive: boolean }) =>
            classNames(
              styles.button,
              isActive ? styles['cart--active'] : styles.cart,
            )
          }
          onClick={handleNavLinkClick}
        >
          <CartIcon />
          {!!cartCounter && (
            <span className={styles.counter}>{cartCounter}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
