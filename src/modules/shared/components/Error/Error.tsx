import React from 'react';
import styles from './Error.module.scss';

type Props = {
  error: string;
  reload: () => void;
};

export const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <h3 className={styles.error}>
      {error}

      <div className={styles.error__icon} onClick={() => reload()}>
        ⟳
      </div>
    </h3>
  );
};
