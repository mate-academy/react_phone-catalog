import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '@ui/index';

import { useAppSelector } from '@hooks/index';

import { CATEGORIES } from '@utils/constants/imagesCategory';

import styles from './Categories.module.scss';
import { Category } from './category/Category';

export const Categories: FC = () => {
  const { t } = useTranslation();
  const { phones } = useAppSelector(state => state.phones);
  const { tablets } = useAppSelector(state => state.tablets);
  const { accessories } = useAppSelector(state => state.accessories);

  const categoryLengths: { [key: number]: number } = {
    1: phones.length,
    2: tablets.length,
    3: accessories.length,
  };

  const updatedCategories = CATEGORIES.map(item => ({
    ...item,
    length: categoryLengths[item.id] || 0,
  }));

  const localTitle = t('home.categories.title');

  return (
    <section className={styles.categorySection}>
      <Title level={2}>{localTitle}</Title>

      <div className={styles.products}>
        {updatedCategories.map(categoryItem => (
          <Category key={categoryItem.id} categories={categoryItem} />
        ))}
      </div>
    </section>
  );
};
