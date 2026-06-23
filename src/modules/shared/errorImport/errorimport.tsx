import React from 'react';
import styles from './erro.module.scss';
import { recharge } from '../../../utils/recharge/recharge';

export const ErrorMessage: React.FC = () => {
  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>Something went wrong</h2>
      <button onClick={recharge} className={styles.error__button}>
        Recharge
      </button>
    </div>
  );
};
