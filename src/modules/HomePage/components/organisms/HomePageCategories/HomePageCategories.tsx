import React, { useMemo } from 'react';
import styles from './HomePageCategories.module.scss';
import { Typography } from '../../../../shared/atoms/Typography';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ResponsiveImage } from '../../../../shared/atoms/ResponsiveImage';
import { useAppSelector } from '../../../../../hooks/hooks';
import classNames from 'classnames';
import { Heading } from '../../../../shared/molecules/Heading';
import { CATEGORIES } from './constants';

export const HomePageCategories: React.FC = () => {
  const { products } = useAppSelector(state => state.products);

  const lengths = useMemo(() => {
    return CATEGORIES.reduce(
      (acc, category) => {
        acc[category] = products.filter(
          product => product.category === category,
        ).length;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [products]);

  const { t } = useTranslation();
  return (
    <div className={styles.categories}>
      <Typography variant="h2" tag="h2" className={styles.categories__title}>
        {t('home.categories')}
      </Typography>

      <div className={styles.categories__list}>
        {CATEGORIES.map(category => (
          <NavLink
            key={category}
            to={`/${category}`}
            className={classNames(styles.categories__item, styles.category)}
          >
            <ResponsiveImage
              mobileSrc={`images/category-${category}-desktop.png`}
              alt={`${category} category`}
            />
            <Heading
              title={t(`${category}.title`)}
              subtitle={t('catalog.subtitle.items', {
                count: lengths[category],
              })}
              title_tag="h4"
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};
