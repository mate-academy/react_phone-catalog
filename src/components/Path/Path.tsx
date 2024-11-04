import styles from './Path.module.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Fragment, useMemo } from 'react';
import classNames from 'classnames';

export const Path = () => {
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(() => {
    let currentLink = '';

    return pathname
      .split('/')
      .filter(location => !!location)
      .map(crumb => {
        currentLink += '/' + crumb;
        const locationName = crumb.slice(0, 1).toUpperCase() + crumb.slice(1);

        return [currentLink, locationName];
      });
  }, [pathname]);

  return (
    <div className={styles.pathContainer}>
      <Link to="/" className={styles.toHome}></Link>
      {breadcrumbs.map(([location, locationName], index) => {
        return (
          <Fragment key={location}>
            <span className={styles.arrowRight}></span>
            <NavLink
              to={`${location}`}
              className={classNames(styles.currPlace, {
                [styles.currPlaceIsDisabled]: index === breadcrumbs.length - 1,
              })}
            >
              {locationName}
            </NavLink>
          </Fragment>
        );
      })}
    </div>
  );
};
