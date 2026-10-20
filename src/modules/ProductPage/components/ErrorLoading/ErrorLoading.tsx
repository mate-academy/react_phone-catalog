import type React from 'react';
import { asset } from '../../../../helper';

import styles from './ErrorLoading.module.scss';

type Props = {
  reloadAction?: () => void;
};

export const ErrorLoading: React.FC<Props> = ({ reloadAction }) => {
  return (
    <div className={styles['error-container']}>
      <img className={styles.image} src={asset('img/error.jpeg')} alt="Error" />
      <h4>Something went wrong :(</h4>
      <p>Please check your connection and try again.</p>

      {reloadAction && (
        <button
          type="button"
          onClick={reloadAction}
          className={styles['reload-button']}
        >
          Try again
          <img
            src={asset('img/reload.svg')}
            className={styles.icon}
            alt="Reload"
          />
        </button>
      )}
    </div>
  );
};
