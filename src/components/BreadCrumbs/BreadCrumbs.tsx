import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';

import styles from './BreadCrumbs.module.scss';
import classNames from 'classnames';

interface Props {
  products?: Product[];
  classNameProps?: string;
}

export const BreadCrumbs: React.FC<Props> = ({
  products = [],
  classNameProps = '',
}) => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);

    if (pathParts.length === 0) {
      return [];
    }

    const lastPart = pathParts[pathParts.length - 1];
    const currentProduct = products.find(
      product => product.itemId === lastPart,
    ) ?? { name: lastPart };

    return [...pathParts.slice(0, -1), currentProduct.name];
  }, [location.pathname, products]);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

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

        return (
          <React.Fragment key={routeTo}>
            <span
              className={classNames(
                styles.icon__arrow,
                'icon',
                'icon--arrow',
                'icon--arrow-right',
              )}
            />
            {isLast ? (
              <span
                className={classNames(
                  styles.breadcrumbs__item,
                  styles['breadcrumbs__item--last'],
                )}
              >
                {capitalize(crumb)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className={classNames(
                  styles.breadcrumbs__item,
                  styles['breadcrumbs__item--link'],
                )}
              >
                {capitalize(crumb)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
