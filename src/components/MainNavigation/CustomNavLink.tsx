import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './MainNavigation.scss';

type Props = {
  to: string;
  text: string | number | ReactNode;
};

export const CustomNavLink: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        isActive ? 'main-header__active' : '',
      )}
    >
      {text}
    </NavLink>
  );
};
