import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

import { getAccessories, getPhones, getTablets } from '../../../services/api';

import { Phone } from '../../../types/Phone';
import { Tablet } from '../../../types/Tablet';
import { Accessory } from '../../../types/Accessory';

type ProductUnionType = Phone | Tablet | Accessory;

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { category, productId } = useParams();

  const [modelName, setModelName] = useState('');

  const pathname = location.pathname.replace('/', '');

  const pageName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : pathname
      ? pathname.charAt(0).toUpperCase() + pathname.slice(1)
      : '';

  const backPath = `/${category || ''}`;

  useEffect(() => {
    const loadProduct = async () => {
      if (!category || !productId) {
        setModelName('');

        return;
      }

      try {
        let data: ProductUnionType[] = [];

        switch (category) {
          case 'phones':
            data = await getPhones();
            break;

          case 'tablets':
            data = await getTablets();
            break;

          case 'accessories':
            data = await getAccessories();
            break;

          default:
            return;
        }

        const found = data.find(product => product.id === productId);

        setModelName(found?.name ?? '');
      } catch (error) {
        // console.error('Failed to load product:', error);
      }
    };

    loadProduct();
  }, [category, productId]);

  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__nav}>
        <Link
          to="/"
          className={`${styles.breadcrumbs__link} ${styles.breadcrumbs__linkHome}`}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/icons/home-icon.svg`}
            alt="Home"
            className={styles.homeIcon}
          />
        </Link>

        <div className={styles.breadcrumbs__separator}></div>

        {productId ? (
          <Link
            to={backPath}
            className={`${styles.breadcrumbs__link} ${styles.breadcrumbs__linkCategory}`}
          >
            {pageName}
          </Link>
        ) : (
          <span className={styles.breadcrumbs__current}>{pageName}</span>
        )}

        {modelName && (
          <>
            <span className={styles.breadcrumbs__separator}></span>

            <span
              className={`${styles.breadcrumbs__current} ${styles.breadcrumbs__currentProduct}`}
            >
              {modelName}
            </span>
          </>
        )}
      </div>

      {modelName && (
        <>
          <div className={styles.breadcrumbs__back}>
            <span className={styles.breadcrumb__back}></span>
            <Link to={backPath} className={styles.breadcrumbs__backLink}>
              Back
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
