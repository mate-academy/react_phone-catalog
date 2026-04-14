import React from 'react';
import styles from './ProductSpecs.module.scss';
import classNames from 'classnames';

interface Props {
  screen: string;
  capacity: string;
  ram: string;
}

export const ProductSpecs: React.FC<Props> = ({ screen, capacity, ram }) => {
  const specs = [
    { label: 'Screen', value: screen },
    { label: 'Capacity', value: capacity },
    { label: 'RAM', value: ram },
  ];

  return (
    <div className={styles.specs}>
      {specs.map(({ label, value }) => (
        <div key={label} className={styles.specRow}>
          <span className={classNames(styles.specLabel, 'small-text')}>{label}</span>
          <span className={styles.specValue}>{value}</span>
        </div>
      ))}
    </div>
  );
};
