import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './PageNavLink.scss';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames('page-nav-link', {
      'page-nav-link--active': isActive,
    })}
  >
    {text}
  </NavLink>
);
