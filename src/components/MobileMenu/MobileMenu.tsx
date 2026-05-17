import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartValues } from '../../store/CartStore';
import { useFavouriteValues } from '../../store/FavouriteContext';
import styles from './MobileMenu.module.scss';
import classNames from 'classnames';
import logo from '../../../public/img/Logo.svg';

type Props = {
  isOpenMenu: boolean;
  handleCloseMenu: () => {};
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
          className={classNames('MobileMenu', { open: isOpenMenu })}
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
                <img
                  src="./img/delete.svg"
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
                onClick={handleCloseMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/phones"
                className={classNames('bodyMenu__nav--link', {
                  'is-active': location.pathname.includes('phones'),
                })}
                onClick={handleCloseMenu}
              >
                Phones
              </NavLink>
              <NavLink
                to="/tablets"
                className={classNames('bodyMenu__nav--link', {
                  'is-active': location.pathname.includes('tablets'),
                })}
                onClick={handleCloseMenu}
              >
                Tablets
              </NavLink>
              <NavLink
                to="/accessories"
                className={classNames('bodyMenu__nav--link', {
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
              className={classNames(
                'MobileMenu__user--icon',
                'icon--favourites',
                { 'is-active': location.pathname === '/favourites' },
              )}
              onClick={handleCloseMenu}
            >
              <img
                src="./img/favourite-icon.svg"
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
              onClick={handleCloseMenu}
            >
              <img
                src="./img/Shopping-cart.svg"
                alt="favourite icon"
                className="icon icon-user"
              />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
