import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';
import { MenuOpen } from '../../utils/MenuContext';
import { useContext } from 'react';
import { useFavorites } from '../../utils/Favorites';

export const Header = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuOpen);

  const favorites = useFavorites(state => state.favorites);

  return (
    <header className="header">
      <div className="header__nav-wrapper">
        <Link to="/" className="header__logo" />
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
              <NavLink
                to="/"
                className={({ isActive }: { isActive: boolean }) =>
                  classNames('header__link', {
                    'is-active-link is-active-link--nav-link': isActive,
                  })
                }
              >
                Home
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/phones"
                className={({ isActive }: { isActive: boolean }) =>
                  classNames('header__link', {
                    'is-active-link is-active-link--nav-link': isActive,
                  })
                }
              >
                Phones
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/tablets"
                className={({ isActive }: { isActive: boolean }) =>
                  classNames('header__link', {
                    'is-active-link is-active-link--nav-link': isActive,
                  })
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/accessories"
                className={({ isActive }: { isActive: boolean }) =>
                  classNames('header__link', {
                    'is-active-link is-active-link--nav-link': isActive,
                  })
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {!isMenuOpen && (
        <button
          className="header__icons header__icons--menu"
          onClick={() => setIsMenuOpen(true)}
        />
      )}
      {isMenuOpen && (
        <button
          className="header__icons header__icons--close"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <div className="header__icons-wrapper">
        <NavLink
          to="/favorites"
          className={({ isActive }: { isActive: boolean }) =>
            classNames('header__icons header__icons--favorite', {
              'header__icons--favorite--active': isActive,
            })
          }
        >
          {favorites.length !== 0 && (
            <div className="header__favorite-counter">{favorites.length}</div>
          )}
        </NavLink>
        <NavLink to="/basket" className="header__icons header__icons--basket" />
      </div>
    </header>
  );
};
