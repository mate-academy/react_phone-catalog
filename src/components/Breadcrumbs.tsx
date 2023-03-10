import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs = () => {
  const crumbs = useLocation()
    .pathname.split('/')
    .filter((crumb) => crumb !== '');

  let currentLink = '';

  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__home" />

      {crumbs.map((crumb, index) => {
        const title = crumb.split('-').join(' ');

        currentLink += `/${crumb}`;

        return (
          <Link
            to={`/${currentLink}`}
            key={crumb}
            className={classNames('breadcrumbs__link', {
              'breadcrumbs__link--disabled': index === crumbs.length - 1,
            })}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
};
