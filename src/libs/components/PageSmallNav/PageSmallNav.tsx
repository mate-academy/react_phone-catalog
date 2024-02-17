import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './PageSmallNav.scss';

type Props = {
  classNames?: string,
};

export const PageSmallNav: React.FC<Props> = ({ classNames }) => {
  const location = useLocation();

  const pathes = location.pathname.slice(1).split('/');

  return (
    <div className={cn('page-small-nav', classNames)}>
      <Link
        to="/"
        className="page-small-nav__home"
      />
      {
        pathes.map((path, i) => {
          if (i === pathes.length - 1) {
            return (
              <p
                key={path}
                className="
                page-small-nav__link
                page-small-nav__link--current
              "
              >
                {`${path[0].toUpperCase()}${path.slice(1)}`}
              </p>
            );
          }

          return (
            <Link
              to="/phones"
              key={path}
              className="
                page-small-nav__link
              "
            >
              {`${path[0].toUpperCase()}${path.slice(1)}`}
            </Link>
          );
        })
      }
    </div>
  );
};
