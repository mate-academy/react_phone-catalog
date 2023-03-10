import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export type Props = {
  to: string;
  title: string;
};

export const PageNavLink: FC<Props> = ({ to, title }) => (
  <li className="navbar__item">
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar__link', { 'navbar__link--active': isActive },
      )}
    >
      {title}
    </NavLink>
  </li>
);
