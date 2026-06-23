import React from 'react';
import styles from './CharacteristicsTable.module.scss';

type Characteristic = {
  name: string;
  value?: string;
};

type Props = {
  characteristics: Characteristic[];
};

export const CharacteristicsTable: React.FC<Props> = ({ characteristics }) => {
  return (
    <div className={styles.details}>
      {characteristics.map(({ name, value }) => (
        <div className={styles.details__row} key={name}>
          <div className={styles.details__name}>{name}</div>
          <div className={styles.details__value}>
            <div className={styles.details__value}>
              {value && value.length > 20
                ? value.slice(0, 20) + '...'
                : value || '-'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
