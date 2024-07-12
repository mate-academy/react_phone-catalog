import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import classes from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const BreadcrumbsHome = () => <div className={classes.BreadcrumbsHome} />;

  const routes = [{ path: '/', breadcrumb: BreadcrumbsHome }];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className={classes.Breadcrumbs}>
      {breadcrumbs.map(({ match, breadcrumb }, index) => {
        return (
          <div key={match.pathname} className={classes.Breadcrumbs__container}>
            <Link to={match.pathname} className={classes.Breadcrumbs__link}>
              {breadcrumb}
            </Link>

            {index < breadcrumbs.length - 1 && (
              <div className={classes.Breadcrumbs__icon} />
            )}
          </div>
        );
      })}
    </div>
  );
};
