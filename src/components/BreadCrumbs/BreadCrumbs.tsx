import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';

export const BreadCrumbs: React.FC = () => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname.split('/').slice(1);

  return (
    <div className="BreadCrumbs">
      <Link to="/" className="BreadCrumbs__crumb BreadCrumbs__crumb--home" />

      {crumbs.map(crumb => {
        currentLink += `/${crumb}`;

        return (
          <div key={crumb} className="BreadCrumbs__crumb">
            <Link to={currentLink}>{crumb}</Link>
          </div>
        );
      })}
    </div>
  );
};
