import React from 'react';
import s from './NavMenu.module.scss';
import classNames from 'classnames';

type Props = {
  burgerMenu?: boolean;
};

export const NavMenu: React.FC<Props> = ({ burgerMenu = false }) => {
  const navItemClass = classNames(s.nav__item, {
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
          <a href="" className={s.nav__link}>
            <p>home</p>
          </a>
        </li>
        <li className={navItemClass}>
          <a href="" className={s.nav__link}>
            <p>phones</p>
          </a>
        </li>
        <li className={navItemClass}>
          <a href="" className={s.nav__link}>
            <p>tablets</p>
          </a>
        </li>
        <li className={navItemClass}>
          <a href="" className={s.nav__link}>
            <p>accessories</p>
          </a>
        </li>
      </ul>
    </nav>
  );
};
