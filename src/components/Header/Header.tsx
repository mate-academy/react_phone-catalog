import { Link, NavLink } from 'react-router-dom';
import {
  closeImg,
  heartImg,
  logoImg,
  menuImg,
  shopBagImg,
} from '../../utils/imageStore';
import './Header.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { Sidebar } from '../Sidebar';

export const Header: React.FC = () => {
  const [hasMenu, setHasMenu] = useState(false);

  return (
    <div className="header">
      <div className="header__top">
        <div className="header__container">
          <Link
            to="/"
            className="header__logo"
            onClick={() => setHasMenu(false)}
          >
            <img src={logoImg} alt="logo" className="header__logo--img" />
          </Link>
          <nav className="nav header__nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames('nav__link', {
                  'nav__link--active': isActive,
                })
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/test1"
              className={({ isActive }) =>
                classNames('nav__link', {
                  'nav__link--active': isActive,
                })
              }
            >
              Phones
            </NavLink>

            <NavLink
              to="/test2"
              className={({ isActive }) =>
                classNames('nav__link', {
                  'nav__link--active': isActive,
                })
              }
            >
              Tablets
            </NavLink>

            <NavLink
              to="/test3"
              className={({ isActive }) =>
                classNames('nav__link', {
                  'nav__link--active': isActive,
                })
              }
            >
              Accessories
            </NavLink>
          </nav>
        </div>
        <div className="header__action">
          <a
            className="header__icon header__icon--mobile"
            onClick={() => setHasMenu(!hasMenu)}
          >
            <img
              src={hasMenu ? closeImg : menuImg}
              alt="menu"
              className="header__icon--img"
            />
          </a>
          <NavLink
            to="/test55"
            className={({ isActive }) =>
              classNames('header__icon header__icon--tablet', {
                'header__icon--active': isActive,
              })
            }
          >
            <div className="header__icon-container">
              <img
                src={heartImg}
                alt="favourite"
                className="header__icon--img"
              />
              {true && <p className="header__icon-number">12</p>}
            </div>
          </NavLink>
          <NavLink
            to="/test56"
            className={({ isActive }) =>
              classNames('header__icon header__icon--tablet', {
                'header__icon--active': isActive,
              })
            }
          >
            <div className="header__icon-container">
              <img
                src={shopBagImg}
                alt="shopBag"
                className="header__icon--img"
              />
              {true && <p className="header__icon-number">12</p>}
            </div>
          </NavLink>
        </div>
      </div>

      <Sidebar hasMenu={hasMenu} closeMenu={() => setHasMenu(false)} />
    </div>
  );
};
