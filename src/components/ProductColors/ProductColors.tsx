import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ProductColors.module.scss';

interface Props {
  availableColors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  productId?: string;
  className?: string;
}

export const ProductColors: React.FC<Props> = ({ availableColors, selectedColor, onColorChange, productId, className }) => {
  const { t } = useTranslation();

  if (!availableColors || availableColors.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.colorSelector} ${className || ''}`}>
      <div className={styles.header}>
        <span className={styles.label}>{t('availableColors')}</span>
        {productId && (
          <span className={styles.productId}>
            {t('id')}: {productId}
          </span>
        )}
      </div>

      <div className={styles.colors}>
        {availableColors.map(color => (
          <button key={color} className={`${styles.colorButton} ${selectedColor === color ? styles.colorButtonActive : ''}`} onClick={() => onColorChange(color)} type="button" aria-label={color} title={color}>
            <span className={styles.colorCircle} style={{ backgroundColor: color }} />
          </button>
        ))}
      </div>
    </div>
  );
};
