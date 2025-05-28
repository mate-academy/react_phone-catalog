import React, { useContext } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { setIsOpened } from '../../../../app/features/asideMenuSlice';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

interface NavBarItemProps {
  tabValue: string;
}

export const NavBarItem: React.FC<NavBarItemProps> = ({ tabValue }) => {
  const dispatch = useAppDispatch();
  const { isDark } = useContext(DarkModeContext);

  return (
    <li className="nav__list-item">
      <NavLink
        className={({ isActive }) => {
          return classNames('nav__item', {
            'nav__item--active': isActive,
            'nav__item--is-Dark': isDark,
            'nav__item--is-Dark-Active': isDark && isActive,
          });
        }}
        to={tabValue === 'home' ? '/' : tabValue.toLowerCase()}
        onClick={() => {
          dispatch(setIsOpened(false));
        }}
      >
        {tabValue}
      </NavLink>
    </li>
  );
};
