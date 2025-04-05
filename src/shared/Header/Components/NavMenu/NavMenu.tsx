import React, { useContext } from 'react';
import s from './NavMenu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { BurgerContext } from '../../../context/BurgerContext';

type Props = {
  burgerMenu?: boolean;
};

export const NavMenu: React.FC<Props> = ({ burgerMenu = false }) => {
  const { setBurgerMenuActivate } = useContext(BurgerContext);
  const closeBurgerMenu = () => setBurgerMenuActivate(false);
  const navItemClass = classNames(s.nav__item, {
    [s.onMobile]: burgerMenu,
  });
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(s.nav__link, {
      [s.is_active]: isActive,
      [s.onMobile]: burgerMenu,
    });

  return (
    <nav className={classNames(s.nav, { [s.onMobile]: burgerMenu })}>
      <ul
        className={classNames(s.nav__list, {
          [s.onMobile]: burgerMenu,
        })}
      >
        <li className={navItemClass}>
          <NavLink to="/" className={getLinkClass} onClick={closeBurgerMenu}>
            <p>home</p>
          </NavLink>
        </li>
        <li className={navItemClass}>
          <NavLink
            to="/phones"
            className={getLinkClass}
            onClick={closeBurgerMenu}
          >
            <p>phones</p>
          </NavLink>
        </li>
        <li className={navItemClass}>
          <NavLink
            to="/tablets"
            className={getLinkClass}
            onClick={closeBurgerMenu}
          >
            <p>tablets</p>
          </NavLink>
        </li>
        <li className={navItemClass}>
          <NavLink
            to="/accessories"
            className={getLinkClass}
            onClick={closeBurgerMenu}
          >
            <p>accessories</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
