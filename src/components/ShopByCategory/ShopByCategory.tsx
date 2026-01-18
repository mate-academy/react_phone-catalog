import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Categories } from './Categories';
import { getAllCategoryCounts } from '../../utils/Api';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory: React.FC = () => {
  const { t } = useTranslation();
  const [categoryCounts, setCategoryCounts] = useState<{
    phones: number;
    tablets: number;
    accessories: number;
  }>({ phones: 0, tablets: 0, accessories: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategoryCounts = async () => {
      try {
        const counts = await getAllCategoryCounts();

        setCategoryCounts(counts);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryCounts();
  }, []);

  const getCategoryCount = (slug: string): number => {
    return categoryCounts[slug as keyof typeof categoryCounts] || 0;
  };

  return (
    <section className={styles.shopByCategory}>
      <h2 className={styles.title}>{t('shopByCategory')}</h2>

      <div className={styles.categoriesGrid}>
        {Categories.map(category => (
          <Link key={category.id} to={category.link} className={styles.categoryCard}>
            <div className={styles.imageContainer} style={{ backgroundColor: category.color }}>
              <img src={category.image} alt={t(category.nameKey)} className={styles.categoryImage} />
            </div>

            <div className={styles.info}>
              <h3 className={styles.name}>{t(category.nameKey)}</h3>
              <p className={styles.count}>{isLoading ? '...' : `${getCategoryCount(category.slug)} ${t('models')}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
