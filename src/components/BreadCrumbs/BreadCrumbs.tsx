import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';

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
        to="/"
        className="bread-crumbs__home-icon"
      />

      {location.map((loco, ind) => {
        if (ind === location.length - 1) {
          return (
            <div
              key={loco}
              className="bread-crumbs__link"
            >
              {loco.split('-').join(' ')}
            </div>
          );
        }

        return (
          <Link
            key={loco}
            className="bread-crumbs__link"
            to={`/${loco}`}
          >
            {loco.split('-').join(' ')}
          </Link>
        );
      })}
    </div>
  );
};
