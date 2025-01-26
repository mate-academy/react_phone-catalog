import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';

export const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  // console.log(nav);

  const handleBurger = () => {
    setIsMenu(prev => !prev);
  };

  return (
    <div className={classNames('header', { 'full--height': isMenu })}>
      <div className="header__container">
        <div className="header__top">
          <div className="header__top--logo-with-menu">
            <Link to="/" className="header__logo-link">
              <img
                src="./img/icons/Logo.png"
                alt="photo-logo"
                className="header__logo"
              />
            </Link>
            <div className="nav__link nav__link--burger">
              <div
                className={classNames('icon icon__nav icon--burger-menu', {
                  'menu--close': isMenu,
                })}
                onClick={handleBurger}
              ></div>
            </div>
          </div>
          <nav className={classNames('nav', { 'nav--visible': isMenu })}>
            <ul className="nav__list">
              <li className="list__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    classNames('nav__link', { 'is-active': isActive })
                  }
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </NavLink>
              </li>
              <li className="list__item">
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    classNames('nav__link', { 'is-active': isActive })
                  }
                  onClick={() => setIsMenu(false)}
                >
                  Phones
                </NavLink>
              </li>
              <li className="list__item">
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    classNames('nav__link', { 'is-active': isActive })
                  }
                  onClick={() => setIsMenu(false)}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="list__item">
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    classNames('nav__link', { 'is-active': isActive })
                  }
                  onClick={() => setIsMenu(false)}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={classNames('header__icons', { 'icons--visible': isMenu })}
        >
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames('nav__link nav__link--heart', {
                'is-active': isActive,
              })
            }
          >
            <div className="icon icon__nav icon--heart"></div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames('nav__link nav__link--basket', {
                'is-active': isActive,
              })
            }
          >
            <div className="icon icon__nav icon--basket"></div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
