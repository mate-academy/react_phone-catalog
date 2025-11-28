import React from 'react';

import styles from './ErrorMessage.module.scss';

type Props = {
  onReload: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ onReload }) => {
  return (
    <div className={styles.error}>
      <p className={styles.error_message}>Something went wrong</p>
      <button className={styles.error_btn} onClick={onReload}>
        Reload
      </button>
    </div>
  );
};
