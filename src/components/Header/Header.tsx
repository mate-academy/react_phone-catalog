import styles from './Header.module.scss';
import logo from '/img/nice-gadgets-logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';
import favouriteIcon from '/img/icons/favourites-icon.svg';
import cartIcon from '/img/icons/cart-icon.svg';
import SearchInput from '../SearchInput/SearchInput';
import Nav from '../Nav/Nav';

const pages = ['Home', 'Phones', 'Tablets', 'Accessories'];

const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState(false);

  const toggleBurger = (value: boolean) => setOpen(value);

  const { favourites } = useFavourites();
  const { cartLength } = useCart();

  const favouritesLength = favourites.length;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <div className={styles.logo}>
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <Nav pages={pages} pathname={pathname} />
      </div>

      <div className={styles.header__right}>
        <SearchInput />

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

      <BurgerMenu isOpen={isOpen} toggleBurger={toggleBurger} />
    </div>
  );
};

export default Header;
