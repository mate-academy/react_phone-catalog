import './Header.module.scss';
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../../../public/img/logo.svg';
import IconMenu from '../../../public/img/icons/Menu.svg';
import IconMenuClose from '../../../public/img/icons/MenuClose.svg';
import IconHeart from '../../../public/img/icons/heart.svg';
import IconBag from '../../../public/img/icons/bag.svg';
import { FavoritesCounter } from '../FavoritesCounter';
import { useCart } from '../../contexts/CartContext/CartContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const { totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    const handleResize = () => {
      if (window.innerWidth >= 640 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <div className="header_wrapper">
          <div className="header_left-side">
            <div className="header_logo">
              <img src={Logo} alt="logo" />
            </div>
            {/* links appears on desktop or tablet version */}
            <div className="header_navbar header_navbar--bigger-device">
              <ul className="header_nav">
                <li className="header_elem">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'header--active-link header_link'
                        : 'header_link'
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="header_elem">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'header--active-link header_link'
                        : 'header_link'
                    }
                    to="/phones"
                  >
                    Phones
                  </NavLink>
                </li>
                <li className="header_elem">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'header--active-link header_link'
                        : 'header_link'
                    }
                    to="/tablets"
                  >
                    Tablets
                  </NavLink>
                </li>
                <li className="header_elem">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'header--active-link header_link'
                        : 'header_link'
                    }
                    to="/accessories"
                  >
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="header_icons">
            <div className="header_icon_wrapper">
              <img
                className="header_icon"
                src={!isMenuOpen ? IconMenu : IconMenuClose}
                alt="icon"
                onClick={toggleMenu}
              />
            </div>
          </div>
          {/* icons appears on desktop and tablet version */}
          <div className="header_icons header_icons--bigger-device">
            <Link
              to="/favorites"
              className="header_icon_wrapper header_icon_wrapper--counter-position"
            >
              <img className="header_icon" src={IconHeart} alt="icon" />
              <FavoritesCounter />
            </Link>
            <Link
              to="/cart"
              className="header_icon_wrapper header_icon_wrapper--counter-position"
            >
              <img className="header_icon" src={IconBag} alt="icon" />
              {totalItems > 0 && (
                <span className="header-counter">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>

        {/* menu for phones */}
        {isMenuOpen && (
          <div className="header_menu">
            <div className="header_menu_navbar">
              <ul className="header_menu_nav">
                <li className="header_menu_elem">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'header--active-link header_menu_link'
                        : 'header_menu_link'
                    }
                    to="/"
                    onClick={toggleMenu}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="header_menu_elem">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'header--active-link header_menu_link'
                        : 'header_menu_link'
                    }
                    to="/phones"
                    onClick={toggleMenu}
                  >
                    Phones
                  </NavLink>
                </li>
                <li className="header_menu_elem">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'header--active-link header_menu_link'
                        : 'header_menu_link'
                    }
                    to="/tablets"
                    onClick={toggleMenu}
                  >
                    Tablets
                  </NavLink>
                </li>
                <li className="header_menu_elem">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'header--active-link header_menu_link'
                        : 'header_menu_link'
                    }
                    to="/accessories"
                    onClick={toggleMenu}
                  >
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="header_menu_icons_wrapper">
              <Link
                to="/favorites"
                className="header_menu_icons"
                onClick={toggleMenu}
              >
                <img
                  className="header_menu_icon header_icon"
                  src={IconHeart}
                  alt="icon"
                />
              </Link>
              <Link
                to="/cart"
                className="header_menu_icons"
                onClick={toggleMenu}
              >
                <img
                  className="header_menu_icon header_icon"
                  src={IconBag}
                  alt="icon"
                />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
