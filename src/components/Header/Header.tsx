import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { FavouritesIcon } from '../Icons/FavouritesIcon';
import { CartIcon } from '../Icons/CartIcon';
import classNames from 'classnames';
import { useFavouriteProducts } from '../../store/FavouriteProductsContext';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__navItem, 'text-uppercase', {
      [styles.header__isActive]: isActive,
    });

  const getLinkClassIcon = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__icon, {
      [styles.header__isActive]: isActive,
    });

  const { favouriteProducts } = useFavouriteProducts();

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <NavLink to="/" className={styles.header__img}>
          <img src="img/logo.svg" alt="logo" />
        </NavLink>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="phones" className={getLinkClass}>
          Phones
        </NavLink>
        <NavLink to="tablets" className={getLinkClass}>
          Tablets
        </NavLink>
        <NavLink to="accessories" className={getLinkClass}>
          Accessories
        </NavLink>
      </nav>
      <div className={styles.header__icons}>
        <NavLink to="favourites" className={getLinkClassIcon}>
          <FavouritesIcon />
          {favouriteProducts.length > 0 && (
            <div className={styles.header__iconCounter}>
              {favouriteProducts.length}
            </div>
          )}
        </NavLink>
        <NavLink to="cart" className={getLinkClassIcon}>
          <CartIcon />
        </NavLink>
      </div>
    </header>
  );
};
