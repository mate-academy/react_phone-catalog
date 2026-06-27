import React from 'react';
import styles from './ShopByCategory.module.scss';
import { Phone } from '../../../../types/phone';
import { Tablet } from '../../../../types/tablet';
import { Accessorie } from '../../../../types/accessorie';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  phones: Phone[];
  tablets: Tablet[];
  accessories: Accessorie[];
  title: string;
};

export const ShopByCategory: React.FC<Props> = ({
  phones,
  tablets,
  accessories,
  title,
}) => {
  const phonesQuantity = phones.length;
  const tabletsQuantity = tablets.length;
  const accessoriesQuantity = accessories.length;

  const { t } = useTranslation();

  return (
    <div className={styles.categoryWrapper}>
      <h2 className={styles.pageTitle}>{title}</h2>

      <div className={styles.categoryContainer}>
        <Link className={styles.category} to="/phones">
          <div className={`${styles.imageBox} ${styles.bgPhones}`}>
            <img
              src="./img/category-phones.png"
              alt="Phones section"
              className={styles.categoryImage}
            />
          </div>
          <h4 className={styles.title}>
            {t('homePage.shopByCategory.phones')}
          </h4>
          <p className={styles.description}>
            {t('homePage.shopByCategory.modelsCount', {
              count: phonesQuantity,
            })}
          </p>
        </Link>

        <Link className={styles.category} to="/tablets">
          <div className={`${styles.imageBox} ${styles.bgTablets}`}>
            <img
              src="./img/category-tablets.png"
              alt="Tablets section"
              className={styles.categoryImage}
            />
          </div>
          <h4 className={styles.title}>
            {t('homePage.shopByCategory.tablets')}
          </h4>
          <p className={styles.description}>
            {t('homePage.shopByCategory.modelsCount', {
              count: tabletsQuantity,
            })}
          </p>
        </Link>

        <Link className={styles.category} to="/accessories">
          <div className={`${styles.imageBox} ${styles.bgAccessories}`}>
            <img
              src="./img/category-accessories.png"
              alt="Accessories section"
              className={styles.categoryImage}
            />
          </div>
          <h4 className={styles.title}>
            {t('homePage.shopByCategory.accessories')}
          </h4>
          <p className={styles.description}>
            {t('homePage.shopByCategory.modelsCount', {
              count: accessoriesQuantity,
            })}
          </p>
        </Link>
      </div>
    </div>
  );
};
