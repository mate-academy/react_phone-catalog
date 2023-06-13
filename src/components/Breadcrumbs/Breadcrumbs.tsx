import classNames from 'classnames';
import './Breadcrumbs.scss';

import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const crumbs = location.pathname
    .split('/')
    .filter(crumb => crumb !== '');

  return (
    <nav
      data-cy="breadCrumbs"
      className="breadcrumb"
    >
      <ul className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link
            to="/"
            className="breadcrumb__home-link"
          >
            <img
              src="/_new/img/icons/home.svg"
              alt="home"
              className="breadcrumb__image"
            />
          </Link>
        </li>

        {crumbs.map((crumb, index) => {
          const title = crumb.split('-').join(' ');

          return (
            <li
              key={crumb}
              className="breadcrumb__item"
            >
              <img
                src="/_new/img/icons/arrow_disabled.svg"
                alt="arrow right"
                className="breadcrumb__image"
              />

              <Link
                to={`/${crumb}`}
                className={classNames(
                  'breadcrumb__link',
                  {
                    'breadcrumb__link--disabled': index === crumbs.length - 1,
                  },
                )}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
