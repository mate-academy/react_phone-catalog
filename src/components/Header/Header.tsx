import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';

export const Header = () => {
  const cart = useAppSelector(state => state.cart);
  const favourite = useAppSelector(state => state.favourite);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = cart.length;
  const favouriteItemsCount = favourite.length;

  const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return classNames('navigation__link', {
      'navigation__link--active': isActive,
    });
  };

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__menu">
          <Link to="/" onClick={closeMenu}>
            <img
              src={'./img/icons/logo.svg'}
              alt="Logo"
              className="header__logo"
            />
          </Link>
          <div className="header__burger">
            {isMenuOpen ? (
              <img
                src="./img/icons/cross-x.svg"
                alt="Close menu"
                onClick={handleMenu}
              />
            ) : (
              <img
                src="./img/icons/burger.svg"
                alt="Open menu"
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
              <NavLink to="/" className={getLinkClasses} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                to="phones"
                className={getLinkClasses}
                onClick={closeMenu}
              >
                Phones
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                to="tablets"
                className={getLinkClasses}
                onClick={closeMenu}
              >
                Tablets
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                to="accessories"
                className={getLinkClasses}
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
                  `${getLinkClasses({ isActive })} badge-items`
                }
                onClick={closeMenu}
              >
                <img
                  src={'./img/icons/favourites-heart.svg'}
                  alt="Heart"
                  className="navigation__icon"
                />
                {!!favouriteItemsCount && (
                  <span className="badge-items__count">
                    {favouriteItemsCount}
                  </span>
                )}
              </NavLink>
            </div>
            <div className="navigation__icons__item">
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  `${getLinkClasses({ isActive })} badge-items`
                }
                onClick={closeMenu}
              >
                <img
                  src={'./img/icons/cart.svg'}
                  alt="Cart"
                  className="navigation__icon"
                />
                {!!cartItemsCount && (
                  <span className="badge-items__count">{cartItemsCount}</span>
                )}
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
