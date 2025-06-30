import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Topbar.scss';

export const TopBar = () => {
  const [changesInFavorites, setChangesInFavorites] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [cartContent, setCartContent] = useState<Product[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleFavouritesChanged = () => {
      setChangesInFavorites(prev => !prev);
    };

    window.addEventListener('favouritesChanged', handleFavouritesChanged);
    window.addEventListener('cartChanged', handleFavouritesChanged);

    return () => {
      window.removeEventListener('favouritesChanged', handleFavouritesChanged);
      window.removeEventListener('cartChanged', handleFavouritesChanged);
    };
  }, []);

  useEffect(() => {
    const storge: Product[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key === 'cart') {
        const value: Product[] = JSON.parse(localStorage.getItem(key) || '[]');

        setCartContent([...value]);
        continue;
      }

      if (key !== null) {
        const value: Product[] = JSON.parse(localStorage.getItem(key) || '[]');

        storge.push(...value);
      }
    }

    setFavourites(storge);
  }, [changesInFavorites]);

  return (
    <div id="topBar" className="top-bar">
      <div className="top-bar__logo">
        <img src="../../icons/logo.svg" alt="Logo Img" />
      </div>

      <nav className="top-bar__nav">
        <ul className="top-bar__nav-primary">
          <li>
            <NavLink
              className={({ isActive }) => {
                return classNames('top-bar__nav-primary-item', {
                  'active-button': isActive,
                });
              }}
              to="/"
            >
              HOME
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => {
                return classNames('top-bar__nav-primary-item', {
                  'active-button': isActive,
                });
              }}
              to="/phones"
            >
              PHONES
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => {
                return classNames('top-bar__nav-primary-item', {
                  'active-button ': isActive,
                });
              }}
              to="/tablets"
            >
              TABLETS
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => {
                return classNames('top-bar__nav-primary-item', {
                  'active-button ': isActive,
                });
              }}
              to="/accessories"
            >
              ACCESSORIES
            </NavLink>
          </li>
        </ul>

        <ul className="top-bar__nav-secondary">
          <li>
            <NavLink
              className={({ isActive }) =>
                `top-bar__nav-secondary-item favourites-button ${isActive && 'active-button'}`
              }
              to="/favourites"
            >
              <img
                className="top-bar__nav-secondary-img"
                src="../../icons/favourites-icon.svg"
                alt="Icon favourites"
              />

              {favourites.length > 0 && (
                <div className="el">{favourites.length}</div>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                classNames('top-bar__nav-secondary-item cart-button', {
                  'active-button': isActive,
                })
              }
              to="/cart"
            >
              <img
                className="top-bar__nav-secondary-img"
                src="../../icons/cart-icon.svg"
                alt="Icon favourites"
              />

              {cartContent.length > 0 && (
                <div className="el">{cartContent.length}</div>
              )}
            </NavLink>
          </li>

          <li>
            {pathname === '/profile' ? (
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="top-bar__nav-secondary-item profile-button"
              >
                <img
                  className="top-bar__nav-secondary-img"
                  src="../../icons/Close.svg"
                  alt="Icon Menu"
                />
              </button>
            ) : (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  classNames('top-bar__nav-secondary-item profile-button', {
                    'active-button': isActive,
                  })
                }
              >
                <img
                  className="top-bar__nav-secondary-img"
                  src="../../icons/menu-icon.svg"
                  alt="Icon Menu"
                />
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};
