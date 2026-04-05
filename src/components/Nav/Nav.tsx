import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { PathType } from '../../types/Types';
import classNames from 'classnames';
import React from 'react';
import style from './Nav.module.scss';
import styleMenu from '../SideMenu/SideMenu.module.scss';
import { navLinks } from '../../constants/constants';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  className?: string;
};

export const Nav: React.FC<Props> = ({ className }) => {
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const sideMenu = searchParams.get('sideMenu');

  const getClassName = ({ isActive }: { isActive: boolean }) =>
    classNames(style.nav__link, { [style.nav__linkIsActive]: isActive });

  return (
    <nav className={classNames(style.nav, className && styleMenu[className])}>
      <ul
        className={classNames(
          style.nav__list,
          className && styleMenu.sideMenu__navList,
        )}
      >
        {navLinks.map(linkText => (
          <li key={linkText} className={style.nav__item}>
            <NavLink
              className={getClassName}
              to={{
                pathname: PathType[linkText],
                search: sideMenu
                  ? getSearchWith(searchParams, { sideMenu: null })
                  : search,
              }}
            >
              {linkText}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
