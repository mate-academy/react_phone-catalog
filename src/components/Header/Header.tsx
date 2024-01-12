/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import classNames from 'classnames';
import { useContext, useState } from 'react';
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { TechProductsContext } from '../../stores/TechProductsContext';
import './Header.scss';
import { totalCountInCart } from '../../helpers/getTotalCount';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export const Header = () => {
  const { productId } = useParams();
  const location = useLocation();
  const category = location.pathname.slice(1);
  const isHome = location.pathname === '/home';
  const [transformMobileMenu, setTransformMobileMenu] = useState(-100);

  const {
    query,
    setSearchWith,
    favouritesProducts,
    cart,
  } = useContext(TechProductsContext);

  if (isHome) {
    return <Navigate to="/" />;
  }

  const getLinkClass = ({ isActive }:{ isActive: boolean }) => {
    return classNames(
      'Header__menu-link',
      { 'Header__menu-link--is-active': isActive },
    );
  };

  const getIconLinkClass = ({ isActive }:{ isActive: boolean }) => {
    return classNames(
      'Header__icon-link',
      { 'Header__icon-link--is-active': isActive },
    );
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({
      query: e.target.value || null,
      perPage: null,
      sort: null,
      page: null,
    });
  };

  const handleOpenMenu = () => {
    setTransformMobileMenu(0);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <header className="Header">
        <div className="Header__container-menu">
          <Link to="/" className="logo Header__logo">
            <img
              src="img/logo/Logo.svg"
              alt="Logo"
              className="logo__image"
            />
          </Link>

          {
            location.pathname !== '/cart' && (
              <nav
                className="Header__menu"
                data-cy="categoryLinksContainer"
              >
                <ul className="Header__menu-list">
                  <li className="Header__menu-item">
                    <NavLink to="/" className={getLinkClass}>
                      Home
                    </NavLink>
                  </li>

                  <li className="Header__menu-item">
                    <NavLink to="/phones" className={getLinkClass}>
                      Phones
                    </NavLink>
                  </li>

                  <li className="Header__menu-item">
                    <NavLink to="/tablets" className={getLinkClass}>
                      Tablets
                    </NavLink>
                  </li>

                  <li className="Header__menu-item">
                    <NavLink to="/accessories" className={getLinkClass}>
                      Accessories
                    </NavLink>
                  </li>
                </ul>
              </nav>
            )
          }
        </div>

        <div className="Header__search-bar">
          <div
            className={
              classNames(
                'Header__search-container',
                {
                  'Header__search-container--open':
                  location.pathname !== '/cart'
                  && location.pathname !== '/'
                  && location.pathname !== `/product/${productId}`,
                },
              )
            }
          >
            <input
              className="search-input"
              type="text"
              value={query}
              placeholder={`Search in ${category}...`}
              onChange={handleQuery}
            />

            {
              query ? (
                <button
                  aria-label="deleteQuery"
                  type="button"
                  data-cy="searchDelete"
                  className="icon icon--delete-query"
                  onClick={() => setSearchWith({ query: null })}
                />
              ) : (
                <button
                  aria-label="searchQuery"
                  type="button"
                  className="icon icon--search-glass"
                  disabled
                />
              )
            }
          </div>
        </div>

        <div className="Header__mobile-right-button-container">
          <div
            className="Header__mobile-icon-wrapper"
          >
            <button
              type="button"
              className="Header__mobile-icon-link"
              onClick={handleOpenMenu}
            >
              <div className="icon icon--menu" />
            </button>
          </div>
        </div>

        <div className="Header__right-buttons-container">
          {
            location.pathname !== '/cart' && (
              <div
                className="Header__icon-wrapper
                Header__icon-wrapper--favourite"
              >
                <NavLink to="/favourites" className={getIconLinkClass}>
                  <div className="icon icon--favourite-in-header" />
                </NavLink>
                {
                  !!favouritesProducts.length && (
                    <div className="Header__count-icon">
                      {favouritesProducts.length}
                    </div>
                  )
                }
              </div>
            )
          }

          <div className="Header__icon-wrapper Header__icon-wrapper--cart">
            <NavLink to="/cart" className={getIconLinkClass}>
              <div className="icon icon--cart" />
            </NavLink>

            {
              !!cart.length && (
                <div className="Header__count-icon">
                  {totalCountInCart(cart)}
                </div>
              )
            }
          </div>
        </div>
      </header>

      <BurgerMenu
        transformMobileMenu={transformMobileMenu}
        setTransformMobileMenu={setTransformMobileMenu}
      />
    </>
  );
};
