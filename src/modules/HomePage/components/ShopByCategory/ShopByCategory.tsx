import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '@/api/api';
import { Product } from '@/types/Product';
import styles from './ShopByCategory.module.scss';

import categoryPhones from '@/assets/img/categoryPhones.webp';
import categoryTablets from '@/assets/img/categoryTablets.webp';
import categoryAccessories from '@/assets/img/categoryAccessories.webp';
import { Heading } from '@/modules/shared/ui/Heading';
import { useTranslation } from 'react-i18next';

export const ShopByCategory: React.FC = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  const { t } = useTranslation();

  useEffect(() => {
    getProducts()
      .then((products: Product[]) => {
        const phones = products.filter(p => p.category === 'phones').length;
        const tablets = products.filter(p => p.category === 'tablets').length;
        const accessories = products.filter(
          p => p.category === 'accessories',
        ).length;

        setCounts({ phones, tablets, accessories });
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error fetching counts:', error));
  }, []);

  const CATEGORIES = [
    {
      id: 'phones',
      title: 'categories.phones',
      count: counts.phones,
      image: categoryPhones,
      path: '/phones',
      bgColor: '#6D6474',
    },
    {
      id: 'tablets',
      title: 'categories.tablets',
      count: counts.tablets,
      image: categoryTablets,
      path: '/tablets',
      bgColor: '#8D8D92',
    },
    {
      id: 'accessories',
      title: 'categories.accessories',
      count: counts.accessories,
      image: categoryAccessories,
      path: '/accessories',
      bgColor: '#973D5F',
    },
  ];

  return (
    <section className={styles.category}>
      <Heading>{t('home.shopByCategory')}</Heading>

      <div className={styles.category__list}>
        {CATEGORIES.map(cat => (
          <Link to={cat.path} key={cat.id} className={styles.category__item}>
            <div
              className={styles.category__imageWrapper}
              style={{ backgroundColor: cat.bgColor }}
            >
              <img
                src={cat.image}
                alt={t(cat.title)}
                className={styles.category__image}
              />
            </div>
            <h3 className={styles.category__subtitle}>{t(cat.title)}</h3>
            <p className={styles.category__count}>
              {t('catalog.modelsCount', { count: cat.count })}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
