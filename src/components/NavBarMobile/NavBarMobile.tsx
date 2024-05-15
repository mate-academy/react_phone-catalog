import { Link, NavLink, useLocation } from 'react-router-dom';
import './NavBarMobile.scss';
import classNames from 'classnames';
import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';

type Props = {
  transition: number;
  setTransition: (transition: number) => void;
  navBarLinkItems: string[];
};

export const NavBarMobile: React.FC<Props> = ({
  transition,
  setTransition,
  navBarLinkItems,
}) => {
  const { pathname } = useLocation();
  const { favouriteProducts, basketProducts } = useContext(StoreContext);

  useEffect(() => {
    setTransition(100);
  }, [pathname, setTransition]);

  return (
    <div
      className="mobile-menu navbar__mobile-menu"
      style={{ transform: `translateY(-${transition}%)` }}
    >
      <div className="mobile-menu__topbar">
        <Link to="/" className="topbar__logo-link">
          <img
            className="topbar__logo-image"
            src="./img/logo/logo-nice-gadgets.svg"
            alt="LOGO"
          />
        </Link>

        <div
          className="navbar-button button__close"
          onClick={() => setTransition(100)}
        />
      </div>

      <div className="mobile-menu__links">
        <ul className="mobile-menu__items">
          {navBarLinkItems.map(item => (
            <li className="mobile-menu__item" key={item}>
              <NavLink
                to={item === 'home' ? '/' : item}
                className={({ isActive }) =>
                  classNames('links__item-link', {
                    'active-navlink': isActive,
                  })
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mobile-menu__buttons">
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames('mobile-menu-button button__favourite', {
                'active-navlink': isActive,
              })
            }
          >
            {!!favouriteProducts.length && (
              <span className="counter counter-favourite--mobile">
                {favouriteProducts.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/basket"
            className={({ isActive }) =>
              classNames('mobile-menu-button button__basket', {
                'active-navlink': isActive,
              })
            }
          >
            {!!basketProducts.length && (
              <span className="counter counter-basket--mobile">
                {basketProducts.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
