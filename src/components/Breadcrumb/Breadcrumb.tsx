import { useLocation, Link } from 'react-router-dom';
import './Breadcrumb.scss';

const normalizeCrumb = (crumb: string) => {
  const normalized = crumb.replace(/-/g, ' ');

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

export const Breadcrumb = () => {
  const location = useLocation();
  const crumbs = location.pathname.split('/').slice(1);
  let currentPath = '';

  return (
    <div className="BreadCrumb" data-cy="breadCrumbs">
      <Link to="/" className="BreadCrumb__home-icon">
        <img
          src="icons/home.svg"
          alt="favourites"
        />
      </Link>

      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        currentPath += `/${crumb}`;

        return (
          <div className="BreadCrumb__crumb" key={crumb}>
            {!isLast
              ? <Link to={currentPath}>{normalizeCrumb(crumb)}</Link>
              : <span>{normalizeCrumb(crumb)}</span>}
          </div>
        );
      })}
    </div>
  );
};
