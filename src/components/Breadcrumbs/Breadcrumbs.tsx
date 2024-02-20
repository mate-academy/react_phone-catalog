import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();
  const currentPath = useLocation().pathname;

  return (
    <div
      className="breadcrumbs"
      data-cy="breadCrumbs"
    >
      {breadcrumbs.map(({ match, breadcrumb }) => {
        return (
          <Link
            key={match.pathname}
            to={match.pathname}
            className={classNames('breadcrumbs__link', {
              'breadcrumbs__link--disabled': match.pathname === currentPath,
            })}
          >
            {match.pathname === '/' ? (
              <span className="breadcrumbs__link--home" />
            ) : (
              breadcrumb
            )}
          </Link>
        );
      })}
    </div>
  );
};
