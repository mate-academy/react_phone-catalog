import React, { useEffect, useState } from 'react';
import styles from './Breadcrumbs.module.scss';
import { useNavigate } from 'react-router-dom';
import productsApi from '../../../../public/api/products.json';
import { ProductType } from 'models/product.model';
import classNames from 'classnames';

export const Breadcrumbs: React.FC<{
  category: string;
  productId?: string | number;
}> = ({ category, productId }) => {
  const navigate = useNavigate();
  const [productTitle, setProductTitle] = useState('');

  const findProductTitle = (id?: string | number) => {
    if (!id) {
      return '';
    }

    const pid = typeof id === 'string' && id.match(/^\d+$/) ? Number(id) : id;
    const product = productsApi.find(
      (p: ProductType) => p.id === pid || p.itemId === String(id),
    );

    return product ? product.name : '';
  };

  const capitalize = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);

  useEffect(() => {
    setProductTitle(findProductTitle(productId));
  }, [productId]);

  return (
    <>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ul className={styles.breadcrumbs__list}>
          <li className={styles.breadcrumbs__item}>
            <img
              className={styles.breadcrumbs__icon}
              src="/public/img/icons/icon-home.png"
              alt=""
              onClick={() => navigate('/')}
            />
          </li>
          <li className={styles.breadcrumbs__item}>
            <img
              className={styles.breadcrumbs__icon}
              src="/public/img/icons/icon-chevron-arrow-right.png"
              alt=""
            />
          </li>
          <li className={styles.breadcrumbs__item}>
            <span
              className={classNames(
                styles.breadcrumbs__link,
                productTitle && styles.breadcrumbs__link_active,
              )}
              onClick={() => navigate(-1)}
            >
              {capitalize(category)}
            </span>
          </li>
          {productTitle && (
            <>
              <li className={styles.breadcrumbs__item}>
                <img
                  className={styles.breadcrumbs__icon}
                  src="/public/img/icons/icon-chevron-arrow-right.png"
                  alt=""
                />
              </li>
              <li className={styles.breadcrumbs__item}>
                <span className={styles.breadcrumbs__current}>
                  {productTitle}
                </span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};
