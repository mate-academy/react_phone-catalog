import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { setIsOpened } from '../../../../app/features/asideMenuSlice';

interface NavBarItemProps {
  tabValue: string;
}

export const NavBarItem: React.FC<NavBarItemProps> = ({ tabValue }) => {
  const dispatch = useAppDispatch();

  return (
    <li className="nav__list-item">
      <NavLink
        className={({ isActive }) => {
          return classNames('nav__item', {
            'nav__item--active': isActive,
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
