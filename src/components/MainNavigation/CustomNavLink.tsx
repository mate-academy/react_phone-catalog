/* eslint-disable react/require-default-props */
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './MainNavigation.scss';

type Props = {
  to: string;
  text: string | number | ReactNode;
  onClick?: () => void;
};

export const CustomNavLink: FC<Props> = ({ to, text, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        'main-header__link-item',
        isActive ? 'main-header__active' : '',
      )}
      onClick={onClick}
    >
      {text}
    </NavLink>
  );
};
