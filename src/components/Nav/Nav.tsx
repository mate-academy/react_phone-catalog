import React, { useContext } from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import { classNameFunc } from '../../helpers/utils/classNameFunc';
import { MenuContext } from '../../helpers/utils/menuContext';

type Props = {
  isFooter?: boolean;
};

const BASE_CLASS = 'nav__link';

export const Nav: React.FC<Props> = ({ isFooter = false }) => {
  const { setHasMenu } = useContext(MenuContext);

  return (
    <nav className="header__nav nav">
      <ul className="nav__list">
        {!isFooter && (
          <li className="nav__item">
            <NavLink
              to="/"
              className={ob => classNameFunc(ob, BASE_CLASS, isFooter)}
              onClick={() => setHasMenu(false)}
            >
              HOME
            </NavLink>
          </li>
        )}
        <li className="nav__item">
          <NavLink
            to="/shop/phones"
            className={ob => classNameFunc(ob, BASE_CLASS, isFooter)}
            onClick={() => setHasMenu(false)}
          >
            Phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/shop/tablets"
            className={ob => classNameFunc(ob, BASE_CLASS, isFooter)}
            onClick={() => setHasMenu(false)}
          >
            tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/shop/accessory"
            className={ob => classNameFunc(ob, BASE_CLASS, isFooter)}
            onClick={() => setHasMenu(false)}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
