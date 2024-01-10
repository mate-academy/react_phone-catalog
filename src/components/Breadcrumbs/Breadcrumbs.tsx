import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const crumbs = useLocation()
    .pathname.split('/')
    .filter((crumb) => crumb !== '');

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <Link to="/" className="breadcrumbs__img">
        <img src="img/mine/icons/Home.svg" alt="home" />
      </Link>

      {crumbs.map((crumb, index) => {
        const title = crumb.split('-').join(' ');
        const currentLink = `/${crumb.toLowerCase()}`;

        return (
          <Link
            to={`${currentLink}`}
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
