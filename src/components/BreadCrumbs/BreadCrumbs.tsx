import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';
import { AppRoutes } from 'config';

export const BreadCrumbs = () => {
  const location = useLocation().pathname
    .split('/')
    .filter(part => part !== '');

  return (
    <div
      className="bread-crumbs"
      data-cy="breadCrumbs"
    >
      <Link
        to={AppRoutes.Root}
        className="bread-crumbs__home-icon"
      />

      {location.map((path, index) => {
        if (index === location.length - 1) {
          return (
            <div
              key={path}
              className="bread-crumbs__link"
            >
              {path.split('-').join(' ')}
            </div>
          );
        }

        return (
          <Link
            key={path}
            className="bread-crumbs__link"
            to={`${AppRoutes.Root}${path}`}
          >
            {path.split('-').join(' ')}
          </Link>
        );
      })}
    </div>
  );
};
