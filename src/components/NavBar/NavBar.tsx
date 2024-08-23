import cn from 'classnames';
import React, { useContext, useEffect } from 'react';
import { Logo } from '../Logo';
import { LOCAL_URL } from '../../api/apiProducts';
import { NavBars } from '../../types/NavBars';
import { NavLink } from 'react-router-dom';
import { FavouritesContext } from '../../contexts/favouritesContext';
import { CartContext } from '../../contexts/CartContext';
import './NavBar.scss';

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  });

  return (
    <nav
      className={cn('navbar header__nav', {
        'header__nav--open': isMenuOpen,
      })}
    >
      <div className="navbar__top">
        <Logo className="navbar__logo" />

        <button
          className="
            navbar__actions-link
            navbar__actions-link--close
          "
          onClick={onToggleMenu}
        >
          <img
            src={`${LOCAL_URL}/icons/close-icon.svg`}
            alt="Close"
            className="icon"
          />
        </button>
      </div>

      <ul className="navbar__list">
        {Object.entries(NavBars).map(([key, value]) => (
          <li className="navbar__item" key={key}>
            <NavLink
              onClick={onToggleMenu}
              to={value}
              className={({ isActive }) =>
                cn('navbar__link', {
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
          onClick={onToggleLink}
          to={'/favorites'}
          className={({ isActive }) =>
            cn('navbar__actions-link', {
              'navbar__actions-link--active': isActive,
            })
          }
        >
          <img src={`${LOCAL_URL}/icons/fav-icon.svg`} alt="Favorites" />

          {!!favAmount && (
            <div className="navbar__items-counter">
              <span className="navbar__items-count">{favAmount}</span>
            </div>
          )}
        </NavLink>

        <NavLink
          to={'/cart'}
          onClick={onToggleLink}
          className={({ isActive }) =>
            cn('navbar__actions-link', {
              'navbar__actions-link--active': isActive,
            })
          }
        >
          <img src={`${LOCAL_URL}/icons/cart-icon.svg`} alt="Favorites" />
          {!!cartAmount && (
            <div className="navbar__items-counter">
              <div className="navbar__items-count">{cartAmount}</div>
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
