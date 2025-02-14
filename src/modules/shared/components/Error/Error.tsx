import React from 'react';
import styles from './Error.module.scss';

type Props = {
  error: string;
  reload?: () => void;
};

export const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <div className={styles.error}>
      {error}

      {reload && (
        <button className={styles.error__icon} onClick={() => reload()}>
          ⟳
        </button>
      )}
    </div>
  );
};
