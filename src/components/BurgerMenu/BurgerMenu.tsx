import React, { useContext } from 'react';
import './BurgerMenu.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { ItemsContext } from '../../ItemsContext';

type Props = {
  setIsBurgerMenuOpen: (item: boolean) => void;
  isBurgerMenuOpen: boolean;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BurgerMenu: React.FC<Props> = ({
  setIsBurgerMenuOpen,
  isBurgerMenuOpen,
  darkTheme,
  setDarkTheme,
}) => {
  const { favoriteProducts, items, amountOfItems } = useContext(ItemsContext);

  const links = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <div
      className={cn('burger', {
        'burger--dark-theme': darkTheme,
      })}
    >
      <div className="burger__top">
        <NavLink to="/" className="burger__logo">
          {darkTheme ? (
            <img
              src="./images/logo/logo.svg"
              alt="Nice gadgets"
              className="burger__logo-image"
            />
          ) : (
            <img
              src="./images/logo/logo-black.svg"
              alt="Nice gadgets"
              className="burger__logo-image"
            />
          )}
        </NavLink>

        <div className="burger__actions">
          <button
            className={cn('theme-switcher', {
              'theme-switcher--dark-theme': darkTheme,
            })}
            onClick={() => {
              setDarkTheme(theme => !theme);
            }}
          ></button>

          <button
            type="button"
            className={cn('burger__close icon-close', {
              'burger__close--dark-theme icon-close--dark-theme': darkTheme,
            })}
            onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
          ></button>
        </div>
      </div>

      <nav className="burger__nav">
        <ul className="burger__nav-list">
          {links.map(link => (
            <li key={link}>
              <NavLink
                onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                to={link === 'home' ? `/` : `/${link}`}
                className={({ isActive }) =>
                  cn('menu-link menu-link--burger', {
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

      <div className="burger__bottom">
        <NavLink
          to="favorites"
          className={({ isActive }) =>
            cn('burger__favorites favorites icon-favorites', {
              'favorites--active': isActive,
            })
          }
          onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
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
            cn('burger__selected selected icon-cart', {
              'selected--active': isActive,
            })
          }
          onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
        >
          {items.length > 0 && (
            <div className="selected__number-of-selected">{amountOfItems}</div>
          )}
        </NavLink>
      </div>
    </div>
  );
};
