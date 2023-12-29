import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const breadcrumbsHome = () => (
    <div className="icon icon-home" />
  );

  const routes = [
    { path: '/', breadcrumb: breadcrumbsHome },
  ];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map(({ match, breadcrumb }, index) => {
        return (
          <div key={match.pathname} className="breadcrumbs__container">
            <Link
              to={match.pathname}
              className="breadcrumbs__link"
            >
              {breadcrumb}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <div className="icon icon-breadcrumbs" />
            )}
          </div>
        );
      })}
    </div>
  );
};
