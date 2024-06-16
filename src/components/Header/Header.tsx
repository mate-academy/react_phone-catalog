import React, { useContext } from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { ItemsContext } from '../../ItemsContext';

type Props = {
  setIsBurgerMenuOpen: (item: boolean) => void;
  isBurgerMenuOpen: boolean;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({
  setIsBurgerMenuOpen,
  isBurgerMenuOpen,
  darkTheme,
  setDarkTheme,
}) => {
  const { favoriteProducts, items, amountOfItems } = useContext(ItemsContext);

  const links = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <header
      className={cn('header', {
        'header--dark-theme': darkTheme,
      })}
    >
      <div className="header__big-block">
        <div className="header__logo-and-menu">
          <Link to="/" className="header__logo">
            <img
              src="./images/logo/logo.svg"
              alt="Nice gadgets"
              className="header__logo-image"
            />
          </Link>

          <div className="header__actions">
            <button
              className={cn('theme-switcher', {
                'theme-switcher--dark-theme': darkTheme,
              })}
              onClick={() => {
                setDarkTheme(!darkTheme);
              }}
            ></button>

            <button
              type="button"
              className={cn('header__menu icon-menu', {
                'header__menu--dark-theme': darkTheme,
              })}
              onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
            ></button>
          </div>
        </div>

        <nav className="header__navigation">
          <ul className="header__navigation-list">
            {links.map(link => (
              <li key={link}>
                <NavLink
                  to={link === 'home' ? `/` : `/${link}`}
                  className={({ isActive }) =>
                    cn('menu-link', {
                      'menu-link--active': isActive,
                      'menu-link--dark-theme': darkTheme,
                      'menu-link--dark-theme-active': darkTheme && isActive,
                    })
                  }
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="header__extra extra">
        <div className="extra__container">
          <button
            className={cn('theme-switcher', {
              'theme-switcher--dark-theme': darkTheme,
            })}
            onClick={() => {
              setDarkTheme(!darkTheme);
            }}
          ></button>

          <NavLink
            to="favorites"
            className={({ isActive }) =>
              cn('extra__favorites favorites icon-favorites', {
                'favorites--active': isActive,
                'favorites--dark-theme-active': isActive && darkTheme,
              })
            }
          >
            {favoriteProducts.length > 0 && (
              <div className="favorites__number-of-favorites">
                {favoriteProducts.length}
              </div>
            )}
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              cn('extra__selected selected icon-cart', {
                'selected--active': isActive,
                'selected--dark-theme-active': isActive && darkTheme,
              })
            }
          >
            {items.length > 0 && (
              <div className="selected__number-of-selected">
                {amountOfItems}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
