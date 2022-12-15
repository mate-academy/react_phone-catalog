import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Nav.scss';

type LinkData = {
  title: string;
  link: string;
};

type Props = {
  pages: LinkData[];
};

export const Nav: FC<Props> = ({ pages }) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {pages.map(page => (
          <li key={page.link} className="nav__item">
            <NavLink
              to={page.link}
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              {page.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
