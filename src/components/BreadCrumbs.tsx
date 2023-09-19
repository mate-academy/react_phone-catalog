import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();

  const breadCrumbs = pathname
    .split('/')
    .filter(item => item !== '');

  return (
    <div className="bread-crumbs">
      <Link to="/" className="bread-crumbs__home" />

      {breadCrumbs.map((crumb, i) => {
        const crumbText = crumb[0].toUpperCase() + crumb.slice(1);

        return breadCrumbs.length !== i + 1
          ? (
            <Link
              to={`/${crumb}`}
              className="bread-crumbs__item bread-crumbs__item--link"
              key={crumb}
            >
              {crumbText}
            </Link>
          ) : (
            <span
              className="bread-crumbs__item bread-crumbs__item--text"
              key={crumb}
            >
              {crumbText}
            </span>
          );
      })}
    </div>
  );
};
