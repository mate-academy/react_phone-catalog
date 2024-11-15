import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const generateLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return classNames('navigation__link', {
      'navigation__link--active': isActive,
    });
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__menu">
          <Link to="/" onClick={closeMenu}>
            <img
              src={'./img/icons/logo.svg'}
              alt="logo"
              className="header__logo"
            />
          </Link>
          <div className="header__burger">
            {isMenuOpen ? (
              <img
                src="./img/icons/close.svg"
                alt="close menu"
                onClick={handleMenu}
              />
            ) : (
              <img
                src="./img/icons/burger-menu.svg"
                alt="open menu"
                onClick={handleMenu}
              />
            )}
          </div>
        </div>

        <nav
          className={classNames('navigation', {
            'navigation--active': isMenuOpen,
          })}
        >
          <ul className="navigation__list">
            <li className="navigation__item">
              <NavLink
                to="/"
                className={({ isActive }) => generateLinkClasses({ isActive })}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                to="phones"
                className={generateLinkClasses}
                onClick={closeMenu}
              >
                Phones
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                to="tablets"
                className={generateLinkClasses}
                onClick={closeMenu}
              >
                Tablets
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                to="accessories"
                className={generateLinkClasses}
                onClick={closeMenu}
              >
                Accessories
              </NavLink>
            </li>
          </ul>

          <div className="navigation__icons">
            <div className="navigation__icons__item">
              <NavLink
                to="favourites"
                className={({ isActive }) =>
                  `${generateLinkClasses({ isActive })} badge-items`
                }
                onClick={closeMenu}
              >
                <img
                  src={'./img/icons/favourites.svg'}
                  alt="favourites-heart"
                  className="navigation__icon"
                />
              </NavLink>
            </div>
            <div className="navigation__icons__item">
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  `${generateLinkClasses({ isActive })} badge-items`
                }
                onClick={closeMenu}
              >
                <img
                  src={'./img/icons/shopping-bag.svg'}
                  alt="spopping-bag"
                  className="navigation__icon"
                />
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
