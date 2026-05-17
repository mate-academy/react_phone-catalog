import React from 'react';
import styles from './MainCharacteristics.module.scss';

interface Props {
  characteristics: {
    screen: string;
    resolution: string;
    processor: string;
    ram: string;
  };
}

export const MainCharacteristics: React.FC<Props> = ({ characteristics }) => {
  return (
    <dl className={styles.descriptions}>
      <dt className={styles.descriptions__name}>screen</dt>
      <dd className={styles.descriptions__value}>{characteristics.screen}</dd>

      <dt className={styles.descriptions__name}>resolution</dt>
      <dd className={styles.descriptions__value}>
        {characteristics.resolution}
      </dd>

      <dt className={styles.descriptions__name}>processor</dt>
      <dd className={styles.descriptions__value}>
        {characteristics.processor}
      </dd>

      <dt className={styles.descriptions__name}>ram</dt>
      <dd className={styles.descriptions__value}>{characteristics.ram}</dd>
    </dl>
  );
};
