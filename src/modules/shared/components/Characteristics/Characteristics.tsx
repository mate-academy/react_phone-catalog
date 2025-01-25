import React from 'react';

import styles from './Characteristics.module.scss';

type Props = {
  characteristics: [string, string][];
};

export const Characteristics: React.FC<Props> = ({ characteristics }) => {
  return (
    <div className={styles.characteristics}>
      {characteristics.map(([key, value]) => (
        <div key={key} className={styles.characteristics__characteristic}>
          <div className={styles.characteristics__key}>{key}</div>
          <div className={styles.characteristics__value}>{value}</div>
        </div>
      ))}
    </div>
  );
};
