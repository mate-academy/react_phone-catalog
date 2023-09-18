import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import classNames from 'classnames';

import './Breadcrumbs.scss';
import {
  ReactComponent as HomeIcon,
} from '../../assets/icons/Home.svg';
import {
  ReactComponent as ArrowRight,
} from '../../assets/icons/Chevron(ArrowRight).svg';

type Props = {
  // eslint-disable-next-line react/require-default-props
  phoneName?: string,
};

export const Breadcrumbs: React.FC<Props> = ({ phoneName = '' }) => {
  const routes = [
    { path: '/', breadcrumb: '' },
    { path: '/phones/:phonesId', breadcrumb: phoneName },
  ];

  const breadcrumbs = useBreadcrumbs(routes);
  const location = useLocation();

  return (
    <div className="breadcrumbs breadcrumbs--margin" data-cy="breadCrumbs">
      <Link to="/">
        <HomeIcon />
      </Link>

      {breadcrumbs.map(({ match, breadcrumb, key }, i) => {
        if (i === 0) {
          return undefined;
        }

        return (
          <Fragment key={key}>
            <div className="breadcrumbs__arrow">
              <ArrowRight />
            </div>

            <Link
              to={match.pathname}
              className={classNames('breadcrumbs__link', {
                'breadcrumbs__link--inactive':
                  location.pathname === match.pathname,
              })}
            >
              {breadcrumb}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
};
