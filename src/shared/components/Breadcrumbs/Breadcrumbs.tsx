import React from 'react';
import { Link } from 'react-router-dom';
import { ICON_PATHS } from '../../constants/IconPaths';

import styles from './Breadcrumbs.module.scss';

type Breadcrumb = {
  name: string;
  path: string;
};

type Props = {
  breadcrumbs: Breadcrumb[];
};

export const Breadcrumbs: React.FC<Props> = ({ breadcrumbs }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__home}>
        <img
          src={ICON_PATHS.home}
          alt="Home"
          className={styles.breadcrumbs__homeIcon}
        />
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <img
            src={ICON_PATHS.arrowRight}
            alt=""
            className={styles.breadcrumbs__separator}
          />

          {index < breadcrumbs.length - 1 ? (
            <Link to={breadcrumb.path} className={styles.breadcrumbs__link}>
              {breadcrumb.name}
            </Link>
          ) : (
            <span className={styles.breadcrumbs__current}>
              {breadcrumb.name}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
