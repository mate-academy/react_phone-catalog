import { useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '../../assets/icons/HomeIcon';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const createCrumb = useCallback(
    (crumb: string, index: number, array: string[]) => {
      const crumbPath = `/${array.slice(0, index + 1).join('/')}`;
      const correctName = crumb
        .split('-')
        .map((part: string) => part[0].toUpperCase() + part.slice(1))
        .join(' ');

      return (
        <>
          <li className="breadcrumbs__item">
            <ArrowRight className="breadcrumbs__arrow" />
          </li>
          <li className="breadcrumbs__item" key={crumb}>
            <Link to={crumbPath} className="breadcrumbs__link">
              {correctName}
            </Link>
          </li>
        </>
      );
    }, [],
  );

  const crumbs = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);

    return pathSegments.map(createCrumb);
  }, [pathname, createCrumb]);

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
