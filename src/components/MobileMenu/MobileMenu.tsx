import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartValues } from '../../store/CartStore';
import { useFavouriteValues } from '../../store/FavouriteContext';
import styles from './MobileMenu.module.scss';
import classNames from 'classnames';
import logo from '../../../public/img/Logo.png';
import deleteIcon from '../../../public/img/delete.png';
import favouriteIcon from '../../../public/img/favourite-icon.png';
import cartIcon from '../../../public/img/Shopping-cart.png';

type Props = {
  isOpenMenu: boolean;
  handleCloseMenu: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpenMenu, handleCloseMenu }) => {
  const location = useLocation();
  const { cartCount } = useCartValues();
  const { favouritesCount } = useFavouriteValues();

  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isOpenMenu]);

  if (!isOpenMenu) {
    return null;
  }

  return (
    <div className={styles.mobileMenu}>
      <header className="MobileMenu__header headerMenu">
        <div className="headerMenu__logo">
          <img src={logo} alt="Logo" className="headerMenu__logo--pict" />
        </div>
        <div className="headerMenu__button">
          <button className="headerMenu__button--icon" onClick={handleCloseMenu}>
            <img
              src={deleteIcon}
              alt="icon close"
              className="icon icon-menu"
            />
          </button>
        </div>
      </header>

      <div className="MobileMenu__body bodyMenu">
        <nav className="bodyMenu__nav">
          <NavLink
            to="/"
            className={classNames('bodyMenu__nav--link', {
              'is-active': location.pathname === '/',
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className={classNames('bodyMenu__nav--link', {
              'is-active': location.pathname.includes('phones'),
            })}
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={classNames('bodyMenu__nav--link', {
              'is-active': location.pathname.includes('tablets'),
            })}
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={classNames('bodyMenu__nav--link', {
              'is-active': location.pathname.includes('accessories'),
            })}
          >
            Accessories
          </NavLink>
        </nav>
      </div>

      <div className="MobileMenu__user">
        <NavLink
          data-count={favouritesCount !== 0 ? `${favouritesCount}` : ''}
          to="/favourites"
          className={classNames(
            'MobileMenu__user--icon',
            'icon--favourites',
            { 'is-active': location.pathname === '/favourites' },
          )}
        >
          <img
            src={favouriteIcon}
            alt="favourite icon"
            className="icon icon-user"
          />
        </NavLink>
        <NavLink
          data-count={cartCount !== 0 ? `${cartCount}` : ''}
          to="/cart"
          className={classNames('MobileMenu__user--icon', {
            'is-active': location.pathname === '/cart',
          })}
        >
          <img
            src={cartIcon}
            alt="cart icon"
            className="icon icon-user"
          />
        </NavLink>
      </div>
    </div>
  );
};
