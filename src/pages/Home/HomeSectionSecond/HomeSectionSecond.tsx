import React, { useMemo } from 'react';
import styles from './HomeSectionSecond.module.scss';
import productsData from 'data/api/products.json';
import { Product } from '@/types/product';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type CategoryType = 'phones' | 'tablets' | 'accessories';

const counterProducts = (
  productList: Product[],
  type: CategoryType,
): number => {
  return productList.reduce((accumulator, product) => {
    if (product.category === type) {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);
};

export const HomeSectionSecond: React.FC = () => {
  const { t } = useTranslation();
  const allProducts: Product[] = productsData;

  const phoneCounter = useMemo(
    () => counterProducts(allProducts, 'phones'),
    [allProducts],
  );
  const tabletsCounter = useMemo(
    () => counterProducts(allProducts, 'tablets'),
    [allProducts],
  );
  const accessoriesCounter = useMemo(
    () => counterProducts(allProducts, 'accessories'),
    [allProducts],
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>{t('categories.title')}</h2>

      <div className={styles.sectionContent}>
        <Link to="/phones" className={styles.sectionItem}>
          <picture
            className={`${styles.pictureContainer} ${styles.pictureContainerFirst}`}
          >
            <source srcSet="img/category-phones.webp" type="image/webp" />
            <img src="img/category-phones.png" alt={t('categories.phones')} />
          </picture>
          <div className={styles.itemDetails}>
            <h3 className={styles.itemDescription}>{t('categories.phones')}</h3>
            <p className={styles.itemCounterModels}>
              {t('categories.models', { count: phoneCounter })}
            </p>
          </div>
        </Link>
        <Link to="/tablets" className={styles.sectionItem}>
          <picture
            className={`${styles.pictureContainer} ${styles.pictureContainerSecond}`}
          >
            <source srcSet="img/category-tablets.webp" type="image/webp" />
            <img src="img/category-tablets.png" alt={t('categories.tablets')} />
          </picture>
          <div className={styles.itemDetails}>
            <h3 className={styles.itemDescription}>
              {t('categories.tablets')}
            </h3>
            <p className={styles.itemCounterModels}>
              {t('categories.models', { count: tabletsCounter })}
            </p>
          </div>
        </Link>
        <Link to="/accessories" className={styles.sectionItem}>
          <picture
            className={`${styles.pictureContainer} ${styles.pictureContainerThird}`}
          >
            <source srcSet="img/category-accessories.webp" type="image/webp" />
            <img
              src="img/category-accessories.png"
              alt={t('categories.accessories')}
            />
          </picture>
          <div className={styles.itemDetails}>
            <h3 className={styles.itemDescription}>
              {t('categories.accessories')}
            </h3>
            <p className={styles.itemCounterModels}>
              {t('categories.models', { count: accessoriesCounter })}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
