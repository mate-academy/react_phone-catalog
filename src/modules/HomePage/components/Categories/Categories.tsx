import React from 'react';
import styles from './Categories.module.scss';
import { Typography } from '@shared/ui/Typography';
import { CategoryCard } from '../CategoryCard';
import { CATEGORY_CARDS } from './constants/categoryCards';
import { useTranslation } from 'react-i18next';

export const Categories: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.categories}>
      <Typography variant="h2">{t('homePage.shopByCategory')}</Typography>

      <div className={styles.categoriesContent}>
        {CATEGORY_CARDS.map(category => (
          <CategoryCard
            key={category.translationKey}
            translationKey={t(category.translationKey)}
            count={category.count}
            image={category.image}
            link={category.link}
          />
        ))}
      </div>
    </section>
  );
};
