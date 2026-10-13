import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useLanguage } from '../../../shared/context/LanguageContext';
import { getPublicPath } from '../../../shared/utils/pathHelper';
import styles from './ShopByCategory.module.scss';

interface Props {
  phonesCount: number;
  tabletsCount: number;
  accessoriesCount: number;
}

export const ShopByCategory: React.FC<Props> = ({
  phonesCount,
  tabletsCount,
  accessoriesCount,
}) => {
  const { t } = useLanguage();

  const categories = [
    {
      title: t('mobilePhones'),
      path: '/phones',
      count: phonesCount,
      image: '/img/category-phones.webp',
      type: 'phones',
    },
    {
      title: t('tablets'),
      path: '/tablets',
      count: tabletsCount,
      image: '/img/category-tablets.webp',
      type: 'tablets',
    },
    {
      title: t('accessories'),
      path: '/accessories',
      count: accessoriesCount,
      image: '/img/category-accessories.webp',
      type: 'accessories',
    },
  ];

  return (
    <section className={styles.section} data-cy="categoryLinksContainer">
      <h2 className={styles.title}>{t('shopByCategory')}</h2>

      <div className={styles.grid}>
        {categories.map(cat => (
          <div key={cat.path} className={styles.categoryCard}>
            <Link
              to={cat.path}
              className={classNames(styles.imageWrapper, styles[cat.type])}
            >
              <img
                src={getPublicPath(cat.image)}
                alt={cat.title}
                className={styles.image}
              />
            </Link>

            <Link to={cat.path} className={styles.categoryTitle}>
              {cat.title}
            </Link>

            <span className={styles.modelsCount}>
              {cat.count} {t('models')}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
