import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { ArrowRightIcon, HomeIcon } from '../icons';

import styles from './Breadcrumbs.module.scss';

type Props = {
  className?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ className = '' }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav className={classNames(styles.breadcrumbs, className)}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link to="/" className={styles.breadcrumbs__link}>
            <HomeIcon
              className={classNames(
                styles.breadcrumbs__icon,
                styles['breadcrumbs__icon--nav'],
              )}
            />
          </Link>
        </li>

        {pathnames.map((segment, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <Fragment key={routeTo}>
              <li
                aria-hidden="true"
                className={classNames(
                  styles.breadcrumbs__item,
                  styles['breadcrumbs__item--separator'],
                )}
              >
                <ArrowRightIcon className={styles.breadcrumbs__icon} />
              </li>
              <li className={styles.breadcrumbs__item}>
                {isLast ? (
                  <span
                    className={classNames(
                      styles.breadcrumbs__link,
                      styles['breadcrumbs__link--current'],
                    )}
                  >
                    <span className={styles.breadcrumbs__text}>
                      {displayName}
                    </span>
                  </span>
                ) : (
                  <Link to={routeTo} className={styles.breadcrumbs__link}>
                    {displayName}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
