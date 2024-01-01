import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../images/logo.svg';
import favouritesImg from '../../images/favourites-hart-like.svg';
import bag from '../../images/shopping-bag.svg';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  classNames('list__link', {
    'list__link--active': isActive,
  })
);

export const Header: React.FC = () => {
  const location = useLocation();
  const { cartPhones, favourites } = useProducts();

  return (
    <header className="header top-bar">
      <div className="top-bar__nav">
        <NavLink className="logo" to="/">
          <img className="logo__image" src={logo} alt="Logo" />
        </NavLink>
        {!location.pathname.includes('cart') && (
          <ul className="list">
            <li className="list__item">
              <NavLink className={getLinkClass} to="/">
                Home
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink className={getLinkClass} to="/phones">Phones</NavLink>
            </li>
            <li className="list__item">
              <NavLink className={getLinkClass} to="/tablets">Tablets</NavLink>
            </li>
            <li className="list__item">
              <NavLink className={getLinkClass} to="/accessories">
                Accessories
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="top-bar__options">
        <div className="top-bar__option">
          <input type="text" />
          <img src="" alt="" />
        </div>
        {!location.pathname.includes('cart') && (
          <NavLink
            className={classNames('top-bar__option', {
              'cart-is-active': location.pathname.includes('favourites'),
            })}
            to="/favourites"
          >
            <div className="icon-container">
              <img
                className={classNames('icon', {
                  'icon--with-amount': favourites.length > 0,
                })}
                src={favouritesImg}
                alt="favourites"
              />
              {favourites.length > 0 && (
                <div className="item-amount">
                  {favourites.length}
                </div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink
          className={classNames('top-bar__option', {
            'cart-is-active': location.pathname.includes('cart'),
          })}
          to="/cart"
        >
          <div className="icon-container">
            <img
              className={classNames('icon', {
                'icon--with-amount': cartPhones.length > 0,
              })}
              src={bag}
              alt="shopping bag"
            />
            {cartPhones.length > 0 && (
              <div className="item-amount">
                {cartPhones.length}
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
