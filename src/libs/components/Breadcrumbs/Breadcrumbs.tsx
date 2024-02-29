import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './Breadcrumbs.scss';

type Props = {
  classNames?: string,
};

export const Breadcrumbs: React.FC<Props> = ({ classNames }) => {
  const location = useLocation();
  const pathes = location.pathname.slice(1).split('/');

  return (
    <div className={cn('breadcrumbs', classNames)}>
      <Link
        to="/"
        className="breadcrumbs__home"
      />
      {
        pathes.map((path, i) => {
          if (i === pathes.length - 1) {
            return (
              <p
                key={path}
                className="
                breadcrumbs__link
                breadcrumbs__link--current
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
                breadcrumbs__link
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
