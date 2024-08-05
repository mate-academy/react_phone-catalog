import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { heartImg, shopBagImg } from '../../utils/imageStore';

type Props = {
  hasMenu: boolean;
  closeMenu: () => void;
};

export const Sidebar: React.FC<Props> = ({ hasMenu, closeMenu }) => {
  return (
    <div className={classNames('sidebar', { 'sidebar--active': hasMenu })}>
      <nav className="nav sidebar__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames('nav__link sidebar__link', {
              'nav__link--active': isActive,
            })
          }
          onClick={closeMenu}
        >
          Home
        </NavLink>

        <NavLink
          to="/test1"
          className={({ isActive }) =>
            classNames('nav__link sidebar__link', {
              'nav__link--active': isActive,
            })
          }
          onClick={closeMenu}
        >
          Phones
        </NavLink>

        <NavLink
          to="/test2"
          className={({ isActive }) =>
            classNames('nav__link sidebar__link', {
              'nav__link--active': isActive,
            })
          }
          onClick={closeMenu}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/test3"
          className={({ isActive }) =>
            classNames('nav__link sidebar__link', {
              'nav__link--active': isActive,
            })
          }
          onClick={closeMenu}
        >
          Accessories
        </NavLink>
      </nav>

      <div className="sidebar__action">
        <NavLink
          to="/test55"
          className={({ isActive }) =>
            classNames('sidebar__icon', {
              'sidebar__icon--active': isActive,
            })
          }
          onClick={closeMenu}
        >
          <div className="sidebar__icon-container">
            <img
              src={heartImg}
              alt="favourite"
              className="sidebar__icon--img"
            />
            {true && <p className="sidebar__icon-number">12</p>}
          </div>
        </NavLink>
        <NavLink
          to="/test56"
          className={({ isActive }) =>
            classNames('sidebar__icon sidebar__icon--right', {
              'sidebar__icon--active': isActive,
            })
          }
          onClick={closeMenu}
        >
          <div className="sidebar__icon-container">
            <img
              src={shopBagImg}
              alt="shopBag"
              className="sidebar__icon--img"
            />
            {true && <p className="sidebar__icon-number">12</p>}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
