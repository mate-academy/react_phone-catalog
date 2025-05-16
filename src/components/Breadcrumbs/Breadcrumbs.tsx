import { Fragment } from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { Icon } from '../Icon';
import classNames from 'classnames';
import { useAllProducts } from '../../hooks/useAllProducts';

export const Breadcrumbs = () => {
  const { category, productId } = useParams();
  const { pathname, state } = useLocation();
  const search = state?.search || '';

  const { allProducts } = useAllProducts(() => {});

  const isValidProduct = productId
    ? allProducts.some(product => product.id === productId)
    : true;

  const pathnames = pathname.split('/').filter(x => x);

  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__home}>
        <Link to="/">
          <Icon type="home" />
        </Link>
      </div>

      <div className={styles.breadcrumbs__icon}>
        {pathnames.length > 0 && <Icon type="arrowNext" />}
      </div>

      {pathnames.map((path, index) => {
        let pathTo = `/${pathnames.slice(0, index + 1).join('/')}`;

        if (pathnames[index] === category) {
          pathTo = pathTo + search;
        }

        if (path === productId && !isValidProduct) {
          return null;
        }

        return (
          <Fragment key={pathTo}>
            <NavLink
              to={pathTo}
              end
              className={({ isActive }) =>
                classNames(styles.breadcrumbs__link, {
                  [styles.breadcrumbs__activeLink]: isActive,
                })
              }
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </NavLink>

            <div className={styles.breadcrumbs__icon}>
              {index < pathnames.length - 1 && <Icon type="arrowNext" />}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
