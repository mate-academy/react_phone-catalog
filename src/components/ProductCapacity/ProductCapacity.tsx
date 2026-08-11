import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ProductCapacity.module.scss';

interface Props {
  availableCapacities: string[];
  selectedCapacity: string;
  onCapacityChange: (capacity: string) => void;
  className?: string;
}

export const ProductCapacity: React.FC<Props> = ({ availableCapacities, selectedCapacity, onCapacityChange, className }) => {
  const { t } = useTranslation();

  if (!availableCapacities || availableCapacities.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.capacitySelector} ${className || ''}`}>
      <span className={styles.label}>{t('selectCapacity')}</span>

      <div className={styles.capacities}>
        {availableCapacities.map(capacity => (
          <button key={capacity} className={`${styles.capacityButton} ${selectedCapacity === capacity ? styles.capacityButtonActive : ''}`} onClick={() => onCapacityChange(capacity)} type="button">
            {capacity}
          </button>
        ))}
      </div>
    </div>
  );
};
