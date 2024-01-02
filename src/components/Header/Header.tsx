/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import {
  Link, NavLink, useLocation,
} from 'react-router-dom';
import classNames from 'classnames';

import './Header.scss';
import { useProductStore } from '../../helpers/store';
import { Search } from '../Search';

export const Header = () => {
  const location = useLocation();
  const PhonesPage = location.pathname === '/phones';
  const TabletsPage = location.pathname === '/tablets';
  const AccessoriesPage = location.pathname === '/accessories';
  const FavouritesPage = location.pathname === '/favourites';

  const getLinkClass = (
    { isActive }: { isActive: boolean },
  ) => classNames('header__nav__link',
    {
      'is-Active': isActive,
    });

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpened(!isMenuOpened);
    document.body.classList.toggle('menu-opened');
  };

  const favProductsId = useProductStore((state) => state.favProductsId);
  const cartProductsId = useProductStore((state) => state.cartProducts);

  return (
    <div
      id="header"
      className="header"
    >
      {screenWidth > 650
        ? (
          <>
            <div className="header__nav">
              <Link
                className="page__logo"
                to="/"
                title="Back to HomePage"
              />
              <NavLink
                to="/"
                className={getLinkClass}
              >
                Home
              </NavLink>
              <NavLink
                to="/phones"
                className={getLinkClass}
              >
                Phones
              </NavLink>
              <NavLink
                to="/tablets"
                className={getLinkClass}
              >
                Tablets
              </NavLink>
              <NavLink
                to="/accessories"
                className={getLinkClass}
              >
                Accessories
              </NavLink>
            </div>

            <div className="header__utils">
              {(PhonesPage || TabletsPage || AccessoriesPage || FavouritesPage)
                && (
                  <Search />
                )}

              <NavLink
                className={(
                  { isActive }: { isActive: boolean },
                ) => classNames('header__icon',
                  {
                    'is-Active': isActive,
                  })}
                to="/favourites"
                title="Favourities"
              >
                <span className="icon icon--fav header__fav">
                  {favProductsId.length >= 1
                    && <span className="header__icon-counter">{favProductsId.length}</span>}
                </span>
              </NavLink>
              <NavLink
                className={(
                  { isActive }: { isActive: boolean },
                ) => classNames('header__icon',
                  {
                    'is-Active': isActive,
                  })}
                to="/cart"
                title="Cart"
              >
                <span className="icon icon--busket">
                  {cartProductsId.length >= 1
                    && <span className="header__icon-counter">{cartProductsId.length}</span>}
                </span>
              </NavLink>
            </div>
          </>
        )
        : (
          <div className="header-small">
            <Link
              className="page__logo"
              to="/"
              title="Back to HomePage"
            />
            <button
              type="button"
              className="header__menu"
              onClick={handleMenuClick}
            >
              <span className="icon icon--menu" />
            </button>
          </div>
        )}

      <aside
        id="menu"
        className={classNames('Menu', {
          'Menu--opened': isMenuOpened,
        })}
      >
        <div className="Menu__top">
          <Link
            className="Menu__logo"
            to="/"
            title="Back to HomePage"
          />
          <button
            type="button"
            className="Menu__cross"
            onClick={handleMenuClick}
          >
            <span className="icon icon--close" />
          </button>
        </div>
        <div className="Menu__main">
          <NavLink
            to="/"
            className="Menu__item"
            onClick={handleMenuClick}
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className="Menu__item"
            onClick={handleMenuClick}
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className="Menu__item"
            onClick={handleMenuClick}
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className="Menu__item"
            onClick={handleMenuClick}
          >
            Accessories
          </NavLink>
        </div>
        <div className="Menu__bottom">
          <div className="Menu__bottom-search">
            {(PhonesPage || TabletsPage || AccessoriesPage || FavouritesPage)
              && <Search />}
          </div>
          <div className="Menu__bottom-utils">
            <Link
              className="Menu--icon icon--fav"
              to="/favourites"
              title="Favourities"
              onClick={handleMenuClick}
            />
            <Link
              className="Menu--icon icon--busket"
              to="/cart"
              title="Cart"
              onClick={handleMenuClick}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};
