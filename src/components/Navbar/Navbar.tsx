import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Navbar.scss';

// Images import
import logoDay from '../../../public/img/logo/logo-day.png';
import logoNight from '../../../public/img/logo/logo-night.png';
import burgerMenuDay from '../../../public/img/icons/menu-day.svg';
import burgerMenuNight from '../../../public/img/icons/menu-night.svg';
import closeMenuDay from '../../../public/img/icons/close-day.svg';
import closeMenuNight from '../../../public/img/icons/close-night.svg';
import favouritesDay from '../../../public/img/icons/favourites-day.svg';
import favouritesNight from '../../../public/img/icons/favourites-night.svg';
import cartDay from '../../../public/img/icons/cart-day.svg';
import cartNight from '../../../public/img/icons/cart-night.svg';
import day from '../../../public/img/icons/day.png';
import night from '../../../public/img/icons/night.png';

type Props = {
  onToggleTheme: () => void;
  isDarkTheme: boolean;
};

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

export const Navbar: React.FC<Props> = ({ onToggleTheme, isDarkTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
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
      return isDarkTheme ? closeMenuNight : closeMenuDay;
    }

    return isDarkTheme ? burgerMenuNight : burgerMenuDay;
  };

  const renderNavLinks = () => {
    return navItems.map(item => (
      <li key={item.path} className="navbar__item">
        <NavLink
          to={item.path}
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

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo">
          <Link to="/" className="navbar__logo_link">
            <img
              src={isDarkTheme ? logoNight : logoDay}
              alt="logo"
              className="navbar__logo_img"
            />
          </Link>
        </div>

        <ul className="navbar__links uppercase">{renderNavLinks()}</ul>
      </div>

      <div className="navbar__right">
        <div className="navbar__theme" onClick={onToggleTheme}>
          <img
            src={isDarkTheme ? night : day}
            alt="Light/Dark theme"
            className="icon"
          />
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
          <img
            src={isDarkTheme ? favouritesNight : favouritesDay}
            alt="Favourites"
            className="icon"
          />
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames('navbar__cart', {
              'navbar__link--active': isActive,
            })
          }
        >
          <img
            src={isDarkTheme ? cartNight : cartDay}
            alt="Cart"
            className="icon"
          />
        </NavLink>
      </div>

      {isMenuOpen && (
        <div className="navbar__menu">
          <ul className="navbar__menu-links uppercase">{renderNavLinks()}</ul>
          <div className="navbar__menu-icons">
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                classNames('navbar__menu-favourites', {
                  'navbar__menu-favourites--active': isActive,
                })
              }
            >
              <img
                src={isDarkTheme ? favouritesNight : favouritesDay}
                alt="Favourites"
                className="icon"
              />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                classNames('navbar__menu-cart', {
                  'navbar__menu-cart--active': isActive,
                })
              }
            >
              <img
                src={isDarkTheme ? cartNight : cartDay}
                alt="Cart"
                className="icon"
              />
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
