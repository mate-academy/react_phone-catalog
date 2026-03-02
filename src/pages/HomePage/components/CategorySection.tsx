import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from '../HomePage.module.scss';

interface Props {
  phonesCount: number;
  tabletsCount: number;
  accessoriesCount: number;
}

export const CategorySection: React.FC<Props> = ({
  phonesCount,
  tabletsCount,
  accessoriesCount,
}) => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <h2 className={styles['section__title']}>{t('home.shop_category')}</h2>
      <div className={styles.categories}>
        <Link
          to="/phones"
          className={styles['category-card']}
        >
          <div className={styles['category-card__image-wrapper']}>
            <img
              src="/img/categories/category-phones.png"
              alt="Phones"
              className={styles['category-card__image']}
            />
          </div>
          <div className={styles['category-card__info']}>
            <h3 className={styles['category-card__title']}>
              {t('categories.phones')}
            </h3>
            <p className={styles['category-card__count']}>
              {t('categories.models_count', { count: phonesCount })}
            </p>
          </div>
        </Link>

        <Link
          to="/tablets"
          className={styles['category-card']}
        >
          <div className={styles['category-card__image-wrapper']}>
            <img
              src="/img/categories/category-tablets.png"
              alt="Tablets"
              className={styles['category-card__image-tablets']}
            />
          </div>
          <div className={styles['category-card__info']}>
            <h3 className={styles['category-card__title']}>
              {t('categories.tablets')}
            </h3>
            <p className={styles['category-card__count']}>
              {t('categories.models_count', { count: tabletsCount })}
            </p>
          </div>
        </Link>

        <Link
          to="/accessories"
          className={styles['category-card']}
        >
          <div className={styles['category-card__image-wrapper']}>
            <img
              src="/img/categories/category-accessories.png"
              alt="Accessories"
              className={styles['category-card__image-access']}
            />
          </div>
          <div className={styles['category-card__info']}>
            <h3 className={styles['category-card__title']}>
              {t('categories.accessories')}
            </h3>
            <p className={styles['category-card__count']}>
              {t('categories.models_count', { count: accessoriesCount })}
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};
