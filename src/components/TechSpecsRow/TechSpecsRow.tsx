import React from 'react';
import styles from './TechSpecsRow.module.scss';

interface Props {
  label: string;
  value: string | number | string[] | undefined;
}

export const TechSpecsRow: React.FC<Props> = ({ label, value }) => {
  if (!value) {
    return null;
  }

  const displayValue = Array.isArray(value) ? value.join(', ') : value;

  return (
    <div className={styles.techSpecs__row}>
      <span className={styles.techSpecs__key}>{label}</span>
      <span className={styles.techSpecs__value}>{displayValue}</span>
    </div>
  );
};
