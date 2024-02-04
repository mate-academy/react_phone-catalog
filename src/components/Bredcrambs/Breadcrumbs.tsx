import cn from 'classnames';
import { Link, useLocation, NavLink } from 'react-router-dom';

import { HomeIcon, ArrowRight } from '../../icons';
import { fnUpperFirstLetter } from '../../helper';

import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <>
          <NavLink
            className={({ isActive }) => cn('breadcrumbs__link',
              isActive ? 'breadcrumbs__active' : '')}
            to={currentLink}
            key={currentLink}
          >
            {fnUpperFirstLetter(crumb)}
          </NavLink>
        </>
      );
    });

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <Link
        to="/"
        className="breadcrumbs__home"
      >
        <HomeIcon />
      </Link>
      <ul className="breadcrumbs__list">
        {crumbs.map((crumb) => (
          <>
            <ArrowRight color="#b4bdc3" />
            <li
              className="breadcrumbs__item"
              key={`${crumb}`}
            >
              {crumb}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
