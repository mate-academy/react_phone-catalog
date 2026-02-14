import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { Icon } from '../Icon';
import { Fragment } from 'react/jsx-runtime';
import cn from 'classnames';

export const Breadcrumbs = () => {
  const { category } = useParams();
  const { pathname, state } = useLocation();
  const search = state?.search || '';

  const pathnames = pathname.split('/').filter(x => x);

  return (
    <div className={styles.breadcrumbs}>
      <span key="home" className={styles.breadcrumbs__item}>
        <Link
          to="/"
          className={`${styles.breadcrumbs__link} ${styles['breadcrumbs__link--home']}`}
        >
          <Icon type="home" />
        </Link>
      </span>

      {pathnames.length > 0 && <Icon type="arrow-right" />}

      {pathnames.map((path, index) => {
        let pathTo = `/${pathnames.slice(0, index + 1).join('/')}`;

        if (pathnames[index] === category) {
          pathTo = pathTo + search;
        }

        return (
          <Fragment key={pathTo}>
            <span className={styles.breadcrumbs__item}>
              <NavLink
                to={pathTo}
                end
                className={({ isActive }) => {
                  return cn(`${styles.breadcrumbs__link}`, {
                    [styles['breadcrumbs__link--active']]: isActive,
                  });
                }}
              >
                {path}
              </NavLink>
            </span>
            {index < pathnames.length - 1 && <Icon type="arrow-right" />}
          </Fragment>
        );
      })}
    </div>
  );
};
