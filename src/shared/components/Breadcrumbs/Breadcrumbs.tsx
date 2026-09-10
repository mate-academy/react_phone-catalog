import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import { Fragment } from 'react';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return null;
  }

  const pathParts = pathname.slice(1).split('/');

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.crumb, { [styles.active]: isActive });

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink}></Link>

      {pathParts.map((part, index, array) => (
        <Fragment key={part + index}>
          <span className={styles.separator}></span>

          <NavLink
            to={'/' + array.slice(0, index + 1).join('/')}
            end
            className={getLinkClass}
          >
            {part.slice(0, 1).toUpperCase() + part.slice(1)}
          </NavLink>
        </Fragment>
      ))}
    </div>
  );
};
