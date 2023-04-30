import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './navlink.scss';

export type Props = {
  to: string;
  title: string;
};

export const PageNavLink: FC<Props> = ({ to, title }) => (
  <li className="navlink">
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navlink__link', { 'navlink__link--active': isActive },
      )}
    >
      {title}
    </NavLink>
  </li>
);
