import { Link, useLocation } from 'react-router-dom';
import s from './Header.module.scss';
import { NavBar } from '../NavBar';
import classNames from 'classnames';
import { MobileMenu } from '../MobileMenu';
import { useContext, useState } from 'react';
import { CartContext } from '../../CartContext';
import { FavouritesContext } from '../../FavouritesContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  const { pathname } = useLocation();

  const cartAmount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={s.header}>
      <Link to="/" className={s['header__logo-link']}>
        <img src="./img/logo.svg" className={s.header__logo} alt="Logo" />
      </Link>

      <div className={s.header__nav}>
        <NavBar />
      </div>

      <div className={s['header__favorites-cart']}>
        <Link
          to="/favorites"
          className={classNames(s.header__favorites, {
            [s['header__favorites--active']]: pathname === '/favorites',
          })}
        >
          <div className={s.header__iconWrap}>
            <img src="./img/icons/favourites.svg" alt="Favorites" />
            {favourites.length > 0 && (
              <span className={s.header__counter}>{favourites.length}</span>
            )}
          </div>
        </Link>
        <Link
          to="/cart"
          className={classNames(s.header__cart, {
            [s['header__cart--active']]: pathname === '/cart',
          })}
        >
          <div className={s.header__iconWrap}>
            <img src="./img/icons/cart.svg" alt="Cart" />
            {cartAmount > 0 && (
              <span className={s.header__counter}>{cartAmount}</span>
            )}
          </div>
        </Link>
      </div>

      <div className={s.header__menu} onClick={() => setIsOpen(true)}>
        <div className={s.header__iconWrap}>
          <img src="./img/icons/menu.svg" alt="Menu" />
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={setIsOpen} />
    </header>
  );
};
