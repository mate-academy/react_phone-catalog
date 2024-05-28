import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const BreadcrumbsHome = () => <div className="BreadcrumbsHome" />;

  const routes = [{ path: '/', breadcrumb: BreadcrumbsHome }];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="Breadcrumbs">
      {breadcrumbs.map(({ match, breadcrumb }, index) => {
        return (
          <div key={match.pathname} className="Breadcrumbs__container">
            <Link to={match.pathname} className="Breadcrumbs__link">
              {breadcrumb}
            </Link>

            {index < breadcrumbs.length - 1 && (
              <div className="Breadcrumbs__icon" />
            )}
          </div>
        );
      })}
    </div>
  );
};
