import React from 'react';
import styles from './ShopByCategory.module.scss';
import { Phone } from '../../../../types/phone';
import { Tablet } from '../../../../types/tablet';
import { Accessorie } from '../../../../types/accessorie';
import { Link } from 'react-router-dom';

type Props = {
  phones: Phone[];
  tablets: Tablet[];
  accessories: Accessorie[];
};

export const ShopByCategory: React.FC<Props> = ({
  phones,
  tablets,
  accessories,
}) => {
  const phonesQuantity = phones.length;
  const tabletsQuantity = tablets.length;
  const accessoriesQuantity = accessories.length;

  return (
    <div className={styles.categoryWrapper}>
      <h2 className={styles.pageTitle}>Shop by category</h2>

      <div className={styles.categoryContainer}>
        <Link className={styles.category} to="/catalog/phones">
          <div className={`${styles.imageBox} ${styles.bgPhones}`}>
            <img
              src="/img/category-phones.png"
              alt="Phones section"
              className={styles.categoryImage}
            />
          </div>
          <h4 className={styles.title}>Mobile phones</h4>
          <p className={styles.description}>{phonesQuantity} models</p>
        </Link>

        <Link className={styles.category} to="/catalog/tablets">
          <div className={`${styles.imageBox} ${styles.bgTablets}`}>
            <img
              src="/img/category-tablets.png"
              alt="Tablets section"
              className={styles.categoryImage}
            />
          </div>
          <h4 className={styles.title}>Tablets</h4>
          <p className={styles.description}>{tabletsQuantity} models</p>
        </Link>

        <Link className={styles.category} to="/catalog/accessories">
          <div className={`${styles.imageBox} ${styles.bgAccessories}`}>
            <img
              src="/img/category-accessories.png"
              alt="Accessories section"
              className={styles.categoryImage}
            />
          </div>
          <h4 className={styles.title}>Accessories</h4>
          <p className={styles.description}>{accessoriesQuantity} models</p>
        </Link>
      </div>
    </div>
  );
};
