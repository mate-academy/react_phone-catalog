import classNames from 'classnames';
import { NavBar } from '../NavBar';
import s from './MobileMenu.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../CartContext';
import { FavouritesContext } from '../../FavouritesContext';

type Props = {
  isOpen: boolean;
  onClose: (v: boolean) => void;
};

export const MobileMenu = ({ isOpen, onClose }: Props) => {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  const { pathname } = useLocation();

  const favouritesAmount = favourites.length;
  const cartAmount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={classNames(s.menu, {
        [s['menu--open']]: isOpen,
      })}
    >
      <div className={s.menu__top}>
        <div className={s.menu__logo}>
          <img
            className={s['menu__logo-img']}
            src="./img/logo.svg"
            alt="Logo"
          />
        </div>
        <div className={s.menu__close} onClick={() => onClose(false)}>
          <img src="./img/icons/close.svg" alt="Close" />
        </div>
      </div>

      <div className={s.menu__nav}>
        <NavBar onClose={onClose} />
      </div>

      <div className={s['menu__favorites-cart']}>
        <Link
          to="/favorites"
          className={classNames(s.menu__favorites, {
            [s['menu__favorites--active']]: pathname === '/favorites',
          })}
          onClick={() => onClose(false)}
        >
          <div className={s.menu__iconWrap}>
            <img src="./img/icons/favourites.svg" alt="Cart" />
            {favouritesAmount > 0 && (
              <span className={s.menu__counter}>{favouritesAmount}</span>
            )}
          </div>
        </Link>
        <Link
          to="/cart"
          className={classNames(s.menu__cart, {
            [s['menu__cart--active']]: pathname === '/cart',
          })}
          onClick={() => onClose(false)}
        >
          <div className={s.menu__iconWrap}>
            <img src="./img/icons/cart.svg" alt="Cart" />
            {cartAmount > 0 && (
              <span className={s.menu__counter}>{cartAmount}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
