import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { LOCAL_URL } from '../../api/apiProducts';
import React, { useContext } from 'react';
import { NavBars } from '../../Types/NavBars';
import { Logo } from '../Logo';
import './NavBar.scss';
import { FavouritesContext } from '../../Contexts/FavouritesContext';
import { CartContext } from '../../Contexts/CartContext';

type Props = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onToggleLink: () => void;
};

export const NavBar: React.FC<Props> = ({
  isMenuOpen,
  onToggleLink,
  onToggleMenu,
}) => {
  const { favourites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  const favAmount = favourites.length;
  const cartAmount = cart.length;

  return (
    <nav
      className={classNames('navbar header__nav', {
        'header__nav--open': isMenuOpen,
      })}
    >
      <div className="navbar__top">
        <Logo className="navbar__logo" />

        <button
          type="button"
          className="navbar__actions-link navbar__actions-link--close"
          onClick={onToggleMenu}
        >
          <img
            src={`${LOCAL_URL}/icons/Close.svg`}
            alt="Close"
            className="icon"
          />
        </button>
      </div>

      <ul className="navbar__list">
        {Object.entries(NavBars).map(([key, value]) => (
          <li className="navbar__item" key={key}>
            <NavLink
              onClick={onToggleLink}
              to={value}
              className={({ isActive }) =>
                classNames('navbar__link', {
                  'navbar__link--active': isActive,
                })
              }
            >
              {key}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <NavLink
          to={`/favorites`}
          onClick={onToggleLink}
          className={({ isActive }) =>
            classNames('navbar__actions-link', {
              'navbar__actions-link--active': isActive,
            })
          }
        >
          <img src={`${LOCAL_URL}/icons/Favourites.svg`} alt="Favourites" />

          {!!favAmount && (
            <div className="navbar__items-counter">
              <span className="navbar__items-count">{favAmount}</span>
            </div>
          )}
        </NavLink>

        <NavLink
          to={`/cart`}
          onClick={onToggleLink}
          className={({ isActive }) =>
            classNames('navbar__actions-link', {
              'navbar__actions-link--active': isActive,
            })
          }
        >
          <img src={`${LOCAL_URL}/icons/Cart.svg`} alt="Cart" />

          {!!cartAmount && (
            <div className="navbar__items-counter">
              <span className="navbar__items-count">{cartAmount}</span>
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
