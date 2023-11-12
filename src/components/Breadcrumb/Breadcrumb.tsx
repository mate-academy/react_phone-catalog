import { useLocation, Link } from 'react-router-dom';
import './Breadcrumb.scss';

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
              ? <Link to={currentPath}>{crumb}</Link>
              : <span>{crumb}</span>}
          </div>
        );
      })}
    </div>
  );
};
