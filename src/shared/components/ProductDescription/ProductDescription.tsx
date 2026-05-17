import React from 'react';
import styles from './ProductDescription.module.scss';
import { ProductDescriptionType } from '../../types/ProductDescriptionType';
import { ProductDescName } from '../../types/ProductDescNameType';
import { useTranslation } from 'react-i18next';

interface Props {
  descriptions: Omit<ProductDescriptionType, 'year' | 'color'>;
}

export const ProductDescription: React.FC<Props> = ({ descriptions }) => {
  const { t } = useTranslation();
  return (
    <dl className={styles.descriptions}>
      <dt className={styles.descriptions__name}>{t(ProductDescName.screen)}</dt>
      <dd className={styles.descriptions__value}>{descriptions.screen}</dd>

      <dt className={styles.descriptions__name}>
        {t(ProductDescName.capacity)}
      </dt>
      <dd className={styles.descriptions__value}>{descriptions.capacity}</dd>

      <dt className={styles.descriptions__name}>{t(ProductDescName.ram)}</dt>
      <dd className={styles.descriptions__value}>{descriptions.ram}</dd>
    </dl>
  );
};
