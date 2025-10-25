import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import styles from './BreadCrumbs.module.scss';

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
    const currentProduct = products.find(p => p.itemId === lastPart) ?? {
      name: lastPart,
    };

    return [...pathParts.slice(0, -1), currentProduct.name];
  }, [location.pathname, products]);

  const formatCrumb = (str: string) => {
    return str.replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase());
  };

  const breadcrumbItems = [
    {
      title: (
        <Link
          to="/"
          className={classNames(
            styles.breadcrumbs__item,
            styles['breadcrumbs__item--link'],
            'icon',
            'icon--home',
          )}
        ></Link>
      ),
    },
    ...breadcrumbs.map((crumb, index) => {
      const routeTo = `/${breadcrumbs.slice(0, index + 1).join('/')}`;
      const isLast = index === breadcrumbs.length - 1;

      return {
        title: isLast ? (
          <span
            className={classNames(
              styles.breadcrumbs__item,
              styles['breadcrumbs__item--last'],
            )}
          >
            {formatCrumb(crumb)}
          </span>
        ) : (
          <Link
            to={routeTo}
            className={classNames(
              styles.breadcrumbs__item,
              styles['breadcrumbs__item--link'],
            )}
          >
            {formatCrumb(crumb)}
          </Link>
        ),
      };
    }),
  ];

  return (
    <Breadcrumb
      separator={<RightOutlined className={classNames(styles.icon__arrow)} />}
      className={classNames(styles.breadcrumbs, classNameProps)}
      items={breadcrumbItems}
    />
  );
};
