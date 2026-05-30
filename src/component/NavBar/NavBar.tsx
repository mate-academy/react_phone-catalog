import './NavBar.scss';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Menu } from '../Menu/Menu';

export const NavBar = () => {
  const [favorites, setFavorites] = useState<number>(0);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const updateCart = () => {
    const cart: string[] = JSON.parse(
      localStorage.getItem('cartForBuying') || '[]',
    );
    const savedCounts: { [key: string]: number } = JSON.parse(
      localStorage.getItem('countItems') || '{}',
    );

    const defaultCounts: { [key: string]: number } = {};

    cart.forEach(id => {
      defaultCounts[id] = savedCounts[id] || 1;
    });

    setCounts(defaultCounts);
  };

  const updateFavorites = () => {
    const updatedFavorites: string[] = JSON.parse(
      localStorage.getItem('favorite') || '[]',
    );

    setFavorites(updatedFavorites.length);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);
  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenMenu]);

  useEffect(() => {
    updateCart();
    updateFavorites();

    const handleFavoritesChange = () => {
      updateFavorites();
    };

    const handleCartChange = () => {
      updateCart();
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);
    window.addEventListener('cartChanged', handleCartChange);

    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
      window.removeEventListener('cartChanged', handleCartChange);
    };
  }, []);

  useEffect(() => {
    setIsOpenMenu(false);
  }, [location.pathname]);

  const totalCount = Object.values(counts).reduce(
    (sum, count) => sum + count,
    0,
  );

  return (
    <nav className="navigation">
      <img
        className="logo"
        src="../../../public/imgForProject/Logo.png"
        alt="Logo"
      />
      {!isMobile ? (
        <ul className="navigation-list">
          <li className="main__navigation main__navigation--text" hidden={true}>
            <NavLink
              className={({ isActive }) =>
                classNames('navigation__link', { 'is-active': isActive })
              }
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                classNames('navigation__link', { 'is-active': isActive })
              }
              to="/phones"
            >
              PHONES
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                classNames('navigation__link', { 'is-active': isActive })
              }
              to="/tablets"
            >
              TABLETS
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                classNames('navigation__link', { 'is-active': isActive })
              }
              to="/accessories"
            >
              ACCESSORIES
            </NavLink>
          </li>

          <li className="main__navigation last-icon__navigation">
            <NavLink
              className={({ isActive }) =>
                classNames('icon-container', { 'is-active': isActive })
              }
              to="/favorites"
            >
              {favorites > 0 && (
                <span className="nav__count favorites__count">{favorites}</span>
              )}
              <img
                className="icon-heart"
                src="/imgForProject/icon/Favourites.png"
                alt="Favorites"
              />
            </NavLink>
          </li>
          <li className="main__navigation last-icon__navigation">
            <NavLink
              className={({ isActive }) =>
                classNames('icon-container', { 'is-active': isActive })
              }
              to="/cart"
            >
              {totalCount > 0 && (
                <span className="nav__count added__count">{totalCount}</span>
              )}
              <img
                className="icon-bag"
                src="/imgForProject/icon/Shopping_bag.png"
                alt="Shopping bag"
              />
            </NavLink>
          </li>
        </ul>
      ) : (
        <div className="main__navigation last-icon__navigation menu-item">
          <button
            className={classNames('icon-phones__menu', {
              button__menu: !isOpenMenu,
              'button__close-menu': isOpenMenu,
            })}
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          ></button>
        </div>
      )}
      <div className={`phone__menu ${isOpenMenu ? 'open' : ''}`}>
        <Menu favorites={favorites} totalCount={totalCount} />
      </div>
    </nav>
  );
};
