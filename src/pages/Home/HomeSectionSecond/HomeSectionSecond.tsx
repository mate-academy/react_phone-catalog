import React, { useMemo } from 'react';
import styles from './HomeSectionSecond.module.scss';
import products from 'data/api/products.json';
import { Product } from '@/types/product';
import { Link } from 'react-router-dom';

type typeCounter = 'phones' | 'tablets' | 'accessories';

const counterProducts = (products: Product[], type: typeCounter): number => {
  const copyProdutsList = [...products];

  switch (type) {
    case 'phones':
      return copyProdutsList.reduce((acc, item) => {
        if (item.category === 'phones') {
          acc++;
        }

        return acc;
      }, 0);

    case 'tablets':
      return copyProdutsList.reduce((acc, item) => {
        if (item.category === 'tablets') {
          acc++;
        }

        return acc;
      }, 0);

    case 'accessories':
      return copyProdutsList.reduce((acc, item) => {
        if (item.category === 'accessories') {
          acc++;
        }

        return acc;
      }, 0);

    default:
      return 0;
  }
};

export const HomeSectionSecond: React.FC = () => {
  const phoneCounter = useMemo(() => counterProducts(products, 'phones'), []);
  const tabletsCounter = useMemo(
    () => counterProducts(products, 'tablets'),
    [],
  );
  const accessoriesCounter = useMemo(
    () => counterProducts(products, 'accessories'),
    [],
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Shop by category</h2>

      <div className={styles.sectionContent}>
        <Link to="/phones" className={styles.sectionItem}>
          <picture
            className={`${styles.pictureContainer} ${styles.pictureContainerFirst}`}
          >
            <source srcSet="img/category-phones.webp" type="image/webp" />
            <img src="img/category-phones.png" alt="Mobile phones" />
          </picture>
          <div className={styles.itemDetails}>
            <h3 className={styles.itemDescription}>Mobile phones</h3>
            <p className={styles.itemCounterModels}>{phoneCounter} models</p>
          </div>
        </Link>
        <Link to="/tablets" className={styles.sectionItem}>
          <picture
            className={`${styles.pictureContainer} ${styles.pictureContainerSecond}`}
          >
            <source srcSet="img/category-tablets.webp" type="image/webp" />
            <img src="img/category-tablets.png" alt="Tablets" />
          </picture>
          <div className={styles.itemDetails}>
            <h3 className={styles.itemDescription}>Tablets</h3>
            <p className={styles.itemCounterModels}>{tabletsCounter} models</p>
          </div>
        </Link>
        <Link to="/accessories" className={styles.sectionItem}>
          <picture
            className={`${styles.pictureContainer} ${styles.pictureContainerThird}`}
          >
            <source srcSet="img/category-accessories.webp" type="image/webp" />
            <img src="img/category-accessories.png" alt="Accessories" />
          </picture>
          <div className={styles.itemDetails}>
            <h3 className={styles.itemDescription}>Accessories</h3>
            <p className={styles.itemCounterModels}>
              {accessoriesCounter} models
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
