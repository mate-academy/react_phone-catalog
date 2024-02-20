/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Navbar } from '../Navbar';
import { Menu } from '../Menu';
import { Logo } from '../Logo';
import { FavouritesProductsContext } from '../../store/FavouritesContext';
import { CartContext } from '../../store/CartContext';
import { Search } from '../Search';

import './Header.scss';

const getLinkFavClass = ({ isActive }: { isActive: boolean }) => classNames(
  'top-bar__icon',
  'top-bar__icon--favourite',
  { 'top-bar__icon--is-active': isActive },
);

const getLinkCartClass = ({ isActive }: { isActive: boolean }) => classNames(
  'top-bar__icon',
  'top-bar__icon--cart',
  { 'top-bar__icon--is-active': isActive },
);

export const Header = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { countOfFavourites } = useContext(FavouritesProductsContext);
  const { countOfProductsInCart } = useContext(CartContext);

  const handleClickMenu = () => {
    setIsOpenMenu(prev => !prev);
    document.body.classList.toggle('body--with-menu');
  };

  return (
    <>
      <div className="header">
        <div className="container container--header">
          <div className="header__content top-bar">
            <div className="top-bar__left">
              <button
                type="button"
                className="button-icon button-icon--menu-open"
                onClick={handleClickMenu}
              />

              <Logo />

              {pathname !== '/cart' && (
                <Navbar isHeader />
              )}
            </div>

            <div className="top-bar__right">
              {(
                pathname === '/favourites'
                || pathname === '/phones'
                || pathname === '/tablets'
                || pathname === '/accessories'
              ) && (
                <Search />
              )}

              {pathname !== '/cart' && (
                <div className="top-bar__icon-container">
                  <NavLink to="/favourites" className={getLinkFavClass} />
                  {countOfFavourites !== 0 && (
                    <NavLink to="/favourites" className="top-bar__icon-count">
                      {countOfFavourites}
                    </NavLink>
                  )}
                </div>
              )}

              <div className="top-bar__icon-container">
                <NavLink to="/cart" state={{ search: searchParams.toString() }} className={getLinkCartClass} />

                {countOfProductsInCart !== 0 && (
                  <NavLink to="/cart" state={{ search: searchParams.toString() }} className="top-bar__icon-count">
                    {countOfProductsInCart}
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenMenu && (
        <Menu onClickMenu={handleClickMenu} isOpenMenu={isOpenMenu} />
      )}
    </>
  );
};
