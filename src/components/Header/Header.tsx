import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { FavouritesIcon } from '../Icons/FavouritesIcon';
import { CartIcon } from '../Icons/CartIcon';
import classNames from 'classnames';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(`${styles.header__navItem} text-uppercase`, {
      [styles.header__isActive]: isActive,
    });

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
        <Link to="favourites" className={styles.header__btn}>
          <FavouritesIcon />
        </Link>
        <Link to="cart" className={styles.header__btn}>
          <CartIcon />
        </Link>
      </div>
    </header>
  );
};
