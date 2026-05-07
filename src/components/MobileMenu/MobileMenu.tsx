import classNames from 'classnames';
import { NavBar } from '../NavBar';
import s from './MobileMenu.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../CartContext';

type Props = {
  isOpen: boolean;
  onClose: (v: boolean) => void;
};

export const MobileMenu = ({ isOpen, onClose }: Props) => {
  const { cart } = useContext(CartContext);

  const { pathname } = useLocation();

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
            <img src="./img/icons/cart.svg" alt="Cart" />
            {cart.length > 0 && (
              <span className={s.menu__counter}>{cart.length}</span>
            )}
          </div>
        </Link>
        <Link
          to="/cart"
          className={classNames(s.menu__cart, {
            [s['menu__cart--active']]: pathname === '/cart',
          })}
          onClick={() => onClose(false)}
        ></Link>
      </div>
    </div>
  );
};
