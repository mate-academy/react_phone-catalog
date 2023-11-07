import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRightIcon } from '../assets/images/icons/ArrowRightIcon';
import { HomeIcon } from '../assets/images/icons/HomeIcon';
import '../styles/blocks/Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  let crumbPath = '';

  const crumbs = useMemo(() => {
    return pathname
      .slice(1)
      .split('/')
      .map((crumb) => {
        crumbPath += `/${crumb}`;
        const correctName = crumb
          .split('-')
          .map((part) => part[0].toUpperCase() + part.slice(1))
          .join(' ');

        return (
          <li className="breadcrumbs__item" key={crumb}>
            <ArrowRightIcon className="breadcrumbs__arrow" />
            <Link to={crumbPath} className="breadcrumbs__link">
              {correctName}
            </Link>
          </li>
        );
      });
  }, [pathname]);

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/home" className="breadcrumbs__link">
            <HomeIcon />
          </Link>
        </li>
        {crumbs}
      </ul>
    </div>
  );
};
