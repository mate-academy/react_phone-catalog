import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import themeStyles from '../../styles/utils/themeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { toggleTheme } from '../../features/currentTheme';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ScreenSize } from '../../types/screenSize';
import { NumberOfItems } from '../NumberOfItems';
import { SearchInput } from '../SearchInput';
import { Category } from '../../types/category';
import { selectTotalItems } from '../../features/cartItems';

import './Navbar.scss';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

export const Navbar: React.FC = () => {
  const isMobile = useMediaQuery(ScreenSize.Mobile);

  const location = useLocation();

  const dispatch = useDispatch();

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const favouritesItems = useSelector(
    (state: RootState) => state.favourites.items,
  );

  const cartItems = useSelector(selectTotalItems);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logo, closeMenuButton, menuButton, favourites, theme, cart } =
    themeStyles(currentTheme === 'light-theme');

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const toggleMenu = () => {
    setIsMenuOpen(curr => !curr);
  };

  // Locks browser scroller
  useEffect(() => {
    document.body.classList.toggle('lock-scroll', isMenuOpen);

    return () => {
      document.body.classList.remove('lock-scroll');
    };
  }, [isMenuOpen]);

  const getMenuIcon = () => {
    if (isMenuOpen) {
      return closeMenuButton;
    }

    return menuButton;
  };

  const renderNavLinks = () => {
    return navItems.map(item => (
      <li key={item.path} className="navbar__item">
        <NavLink
          to={item.path}
          onClick={() => {
            if (isMenuOpen) {
              return toggleMenu();
            }
          }}
          className={({ isActive }) =>
            classNames('navbar__link', {
              'navbar__link--active': isActive,
            })
          }
        >
          {item.label}
        </NavLink>
      </li>
    ));
  };

  const allowedPaths: Category[] = ['phones', 'accessories', 'tablets'];
  const isOnProductPage = allowedPaths.some(path =>
    location.pathname.endsWith(`/${path}`),
  );

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo">
          <Link to="/" className="navbar__logo-link">
            <img src={logo} alt="logo" className="navbar__logo-img" />
          </Link>
        </div>

        <ul className="navbar__links uppercase">{renderNavLinks()}</ul>
      </div>

      <div className="navbar__right">
        {isOnProductPage && <SearchInput />}

        <div className="navbar__theme" onClick={handleThemeToggle}>
          <img src={theme} alt="Light/Dark theme" className="icon" />
        </div>

        <div className="navbar__burger" onClick={toggleMenu}>
          <img src={getMenuIcon()} alt="Menu" className="icon" />
        </div>

        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            classNames('navbar__favourites', {
              'navbar__link--active': isActive,
            })
          }
        >
          <img src={favourites} alt="Favourites" className="icon" />

          {!!favouritesItems.length && (
            <NumberOfItems amount={favouritesItems.length} />
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames('navbar__cart', {
              'navbar__link--active': isActive,
            })
          }
        >
          <img src={cart} alt="Cart" className="icon" />

          {!!cartItems && <NumberOfItems amount={cartItems} />}
        </NavLink>
      </div>

      {isMobile && (
        <div className={classNames('navbar__menu', { active: isMenuOpen })}>
          <ul className="navbar__menu-links uppercase">{renderNavLinks()}</ul>
          <div className="navbar__menu-icons">
            <NavLink
              to="/favourites"
              onClick={toggleMenu}
              className={({ isActive }) =>
                classNames('navbar__menu-favourites', {
                  'navbar__menu-favourites--active': isActive,
                })
              }
            >
              <div className="navbar__menu-favourites-wrapper">
                <img src={favourites} alt="Favourites" className="icon" />

                {!!favouritesItems.length && (
                  <NumberOfItems amount={favouritesItems.length} />
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              onClick={toggleMenu}
              className={({ isActive }) =>
                classNames('navbar__menu-cart', {
                  'navbar__menu-cart--active': isActive,
                })
              }
            >
              <div className="navbar__menu-cart-wrapper">
                <img src={cart} alt="Cart" className="icon" />

                {!!cartItems && <NumberOfItems amount={cartItems} />}
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
