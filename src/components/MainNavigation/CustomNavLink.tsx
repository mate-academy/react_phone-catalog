import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './MainNavigation.scss';

type Props = {
  to: string;
  text: string | number | ReactNode;
  className?: string;
};

export const CustomNavLink: FC<Props> = ({ to, text, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        className,
        isActive ? 'main-header__active' : '',
      )}
    >
      {text}
    </NavLink>
  );
};

CustomNavLink.defaultProps = {
  className: '',
};
