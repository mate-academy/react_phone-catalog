import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  title: string | JSX.Element;
};

export const PageNavLink: FC<Props> = ({ to, title }) => (
  <li className="nav__item">
    <NavLink
      aria-current="page"
      className={({ isActive }) => classNames(
        'nav__link',
        { 'nav__link--active': isActive },
      )}
      to={to}
    >
      {title}
    </NavLink>
  </li>
);
