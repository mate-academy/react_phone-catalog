import React from "react";
import "./SideMenu.scss";
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { navLinks } from './../../helpers/constants';

type SideMenuProps = {
  show: boolean;
}

export const SideMenu: React.FC<SideMenuProps> = ({ show }) => {

  return (
    <nav className={cn('side-drawer', {'side-drawer__open': show})}>
       <ul className="side-nav__list">
        {navLinks.map(link => (
          <li className="side-nav__item"
            key={link.title}
          >
            <NavLink to={link.path}
              className="side-nav__link">
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
