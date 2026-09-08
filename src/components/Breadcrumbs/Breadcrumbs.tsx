import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
// import { useAppSelector } from '../../app/hooks';

import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';

type Props = {
  products?: Product[];
  classNameProps?: string;
};

export const Breadcrumbs: React.FC<Props> = ({
  products = [],
  classNameProps = '',
}) => {
  const location = useLocation();
  const breadcrumbs = location.pathname.split('/').filter(path => path);
  const currentProduct = products.find(
    product => product.itemId === breadcrumbs[breadcrumbs.length - 1],
  ) || { name: breadcrumbs[breadcrumbs.length - 1] };

  breadcrumbs.pop();
  breadcrumbs.push(currentProduct.name);

  return (
    <div className={classNames(styles.breadcrumbs, classNameProps)}>
      <Link
        to="/"
        className={classNames(
          'icon',
          'icon--home',
          styles['breadcrumbs__item--link'],
        )}
      />

      {breadcrumbs.map((crumb, index) => {
        const routeTo = `/${breadcrumbs.slice(0, index + 1).join('/')}`;
        const isLast = index === breadcrumbs.length - 1;
        const crumbName = crumb.charAt(0).toUpperCase() + crumb.slice(1);

        return (
          <React.Fragment key={index}>
            <span
              className={classNames(
                styles.icon__arrow,
                'icon',
                'icon--arrow',
                'icon--arrow--right',
              )}
            ></span>
            {!isLast ? (
              <Link
                to={routeTo}
                className={classNames(
                  styles.breadcrumbs__item,
                  styles['breadcrumbs__item--link'],
                )}
              >
                {crumbName}
              </Link>
            ) : (
              <span
                className={classNames(
                  styles.breadcrumbs__item,
                  styles['breadcrumbs__item--last'],
                )}
              >
                {crumbName}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
