import React from 'react';
import './Navigation.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export const Navigation: React.FC = () => {
  const { cart, favorites } = useAppSelector(state => state.user);

  return (
    <nav className="nav">
      <div className="nav__content nav__box">
        <div className="nav__left">
          <Link to="/" className="icon icon--logo">
            <img src="nav/logo.svg" alt="logo" />
          </Link>

          <ul className="nav__ul">
            <li className="nav__list">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav__list">
              <NavLink
                to="/product/phones"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                Phones
              </NavLink>
            </li>
            <li className="nav__list">
              <NavLink
                to="/product/tablets"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className="nav__list">
              <NavLink
                to="/product/accessories"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav__right">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? 'icon icon--block icon--favourites icon--block-active'
                : 'icon icon--block icon--favourites'
            }
          >
            <img src="nav/favourites.svg" alt="favourites" />
            {favorites.length > 0 && (
              <div className="nav__counter">{favorites.length}</div>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? 'icon icon--block icon--cart icon--block-active'
                : 'icon icon--block icon--cart'
            }
          >
            <img src="nav/cart.svg" alt="cart" />
            {cart.length > 0 && (
              <div className="nav__counter">{cart.length}</div>
            )}
          </NavLink>
          <Link to="/menu" className="icon icon--block icon--menu">
            <img src="nav/menu.svg" alt="menu" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
