import { Link, NavLink, useLocation } from 'react-router-dom';
import './NavBarMobile.scss';
import classNames from 'classnames';
import React, { useEffect } from 'react';

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

  useEffect(() => {
    setTransition(100);
  }, [pathname, setTransition]);

  return (
    <div
      className="mobile-menu navbar__mobile-menu"
      style={{ transform: `translateX(${transition}%)` }}
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
      </div>
    </div>
  );
};
