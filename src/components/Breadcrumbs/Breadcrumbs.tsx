import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';
import { HomeIcon } from '../../assets/icons/HomeIcon';
import { RightBtn } from '../../assets/icons/RightBtn';

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
            <RightBtn className="breadcrumbs__arrow" />
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
          <Link to="/" className="breadcrumbs__link">
            <HomeIcon />
          </Link>
        </li>
        {crumbs}
      </ul>
    </div>
  );
};
