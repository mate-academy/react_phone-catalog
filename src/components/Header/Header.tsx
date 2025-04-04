import styles from './Header.module.scss';
import logo from '/img/nice-gadgets-logo.svg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';
import favouriteIcon from '/img/icons/favourites-icon.svg';
import cartIcon from '/img/icons/cart-icon.svg';

const pages = ['Home', 'Phones', 'Tablets', 'Accessories'];

const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState(false);

  const toggleBurger = (value: boolean) => setOpen(value);

  const { favourites } = useFavourites();
  const { cartLength } = useCart();

  const favouritesLength = favourites.length;

  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <div className={styles.logo}>
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__list}>
            {pages.map((page, index) => {
              const link = `/${page.toLowerCase()}`;

              const activePage =
                pathname === link || (pathname === '/' && page === 'Home');

              return (
                <li
                  key={index}
                  className={`${styles.header__nav__list__item} ${activePage && `${styles.header__nav__list__item_active}`}`}
                >
                  <NavLink to={link}>{page}</NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className={styles.header__right}>
        <Link
          to={`/favourites`}
          className={`${styles.header__favourites} ${pathname.includes('favourites') && styles.header__favourites_active}`}
        >
          <img src={favouriteIcon} alt="favourites" />
          {favouritesLength > 0 && (
            <div className={styles.header__favourites_quantity}>
              {favouritesLength}
            </div>
          )}
        </Link>

        <Link
          to={`/cart`}
          className={`
            ${styles.header__cart}
            ${pathname.includes('cart') && styles.header__cart_active}`}
        >
          <img src={cartIcon} alt="cart" />

          {cartLength > 0 && (
            <div className={styles.header__cart_quantity}>{cartLength}</div>
          )}
        </Link>

        <div className={styles.header__hamburger}>
          <Hamburger
            toggled={isOpen}
            toggle={() => toggleBurger(true)}
            size={20}
          />
        </div>
      </div>

      {isOpen && <BurgerMenu isOpen={isOpen} toggleBurger={toggleBurger} />}
    </div>
  );
};

export default Header;
