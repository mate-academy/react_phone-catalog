import React from 'react';
import { useTranslation } from 'react-i18next';
import { Item } from '../../types/Item';
import styles from './ProductSpecs.module.scss';

interface Props {
  item: Item;
  className?: string;
}

export const ProductSpecs: React.FC<Props> = ({ item, className }) => {
  const { t } = useTranslation();

  const specs = [
    { label: t('screen'), value: item.screen },
    { label: t('resolution'), value: item.resolution },
    { label: t('processor'), value: item.processor },
    { label: t('ram'), value: item.ram },
    { label: t('builtInMemory'), value: item.capacity },
    ...(item.camera ? [{ label: t('camera'), value: item.camera }] : []),
    ...(item.zoom ? [{ label: t('zoom'), value: item.zoom }] : []),
    {
      label: t('cell'),
      value: Array.isArray(item.cell) ? item.cell.join(', ') : item.cell,
    },
  ];

  return (
    <div className={`${styles.productSpecs} ${className || ''}`}>
      <h2 className={styles.title}>{t('techSpecs')}</h2>

      <div className={styles.specsList}>
        {specs.map((spec, index) => (
          <div key={index} className={styles.spec}>
            <span className={styles.specLabel}>{spec.label}</span>
            <span className={styles.specValue}>{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
