import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';

export const BreadCrumbs: React.FC = () => {
  const location = useLocation();
  const crumbs = location.pathname.split('/').slice(1);

  let currentLink = '';

  return (
    <div className="BreadCrumbs" data-cy="breadCrumbs">
      <Link to="/" className="BreadCrumbs__crumb BreadCrumbs__crumb--home" />

      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        currentLink += `/${crumb}`;

        return (
          <div key={crumb} className="BreadCrumbs__crumb">
            {!isLast
              ? <Link to={currentLink}>{crumb}</Link>
              : <span>{crumb}</span>}
          </div>
        );
      })}
    </div>
  );
};
