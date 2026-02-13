import cn from 'classnames';
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { useCartValues } from '../../store/CartContext';
import { useFavouriteValues } from '../../store/FavouriteContext';
import logo from '/img/Logo.svg';

type Props = {
  isOpenMenu: boolean;
  handleCloseMenu: () => void;
};

export const MobileMenu: React.FC<Props> = ({
  isOpenMenu,
  handleCloseMenu,
}) => {
  const location = useLocation();

  const { cartCount } = useCartValues();
  const { favouritesCount } = useFavouriteValues();

  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isOpenMenu]);

  return (
    <>
      {isOpenMenu && (
        <div
          className={cn('MobileMenu', { open: isOpenMenu })}
          role="dialog"
          aria-hidden={!isOpenMenu}
        >
          <header className="MobileMenu__header headerMenu">
            <div className="headerMenu__logo">
              <img src={logo} alt="Logo" className="headerMenu__logo--pict" />
            </div>
            <div className="headerMenu__button">
              <button
                className="headerMenu__button--icon"
                onClick={handleCloseMenu}
              >
                <svg className="icon icon-menu">
                  <use href="img/icons.svg#icon-close"></use>
                </svg>
              </button>
            </div>
          </header>

          <div className="MobileMenu__body bodyMenu">
            <nav className="bodyMenu__nav">
              <NavLink
                to="/"
                className={cn('bodyMenu__nav--link', {
                  'is-active': location.pathname === '/',
                })}
                onClick={handleCloseMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/phones"
                className={cn('bodyMenu__nav--link', {
                  'is-active': location.pathname.includes('phones'),
                })}
                onClick={handleCloseMenu}
              >
                Phones
              </NavLink>
              <NavLink
                to="/tablets"
                className={cn('bodyMenu__nav--link', {
                  'is-active': location.pathname.includes('tablets'),
                })}
                onClick={handleCloseMenu}
              >
                Tablets
              </NavLink>
              <NavLink
                to="/accessories"
                className={cn('bodyMenu__nav--link', {
                  'is-active': location.pathname.includes('accessories'),
                })}
                onClick={handleCloseMenu}
              >
                Accessories
              </NavLink>
            </nav>
          </div>

          <div className="MobileMenu__user">
            <NavLink
              data-count={favouritesCount !== 0 ? `${favouritesCount}` : ''}
              to="/favourites"
              className={cn('MobileMenu__user--icon', 'icon--favourites', {
                'is-active': location.pathname === '/favourites',
              })}
              onClick={handleCloseMenu}
            >
              <svg className="icon icon-user">
                <use href="img/icons.svg#icon-favourites"></use>
              </svg>
            </NavLink>
            <NavLink
              data-count={cartCount !== 0 ? `${cartCount}` : ''}
              to="/cart"
              className={cn('MobileMenu__user--icon', {
                'is-active': location.pathname === '/cart',
              })}
              onClick={handleCloseMenu}
            >
              <svg className="icon icon-user">
                <use href="img/icons.svg#icon-shopping-bag"></use>
              </svg>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
