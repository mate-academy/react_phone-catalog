/* eslint-disable react/no-array-index-key */
import cn from 'classnames';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { HomeIcon } from '../../icons/HomeIcon';
import './Breadcrumbs.scss';
import { ArrowRight } from '../../icons/ArrowRight';
import { fnUpperFirstLetter } from '../../helper/upperFirstLetter';

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
            key={crumb}
          >
            {fnUpperFirstLetter(crumb)}
          </NavLink>
        </>
      );
    });

  return (
    <div className="breadcrumbs">
      <Link
        to="/"
        className="breadcrumbs__home"
      >
        <HomeIcon />
      </Link>
      <ul className="breadcrumbs__list">
        {crumbs.map((crumb, index) => (
          <>
            <ArrowRight color="#b4bdc3" />
            <li
              className="breadcrumbs__item"
              key={index}
            >
              {crumb}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
