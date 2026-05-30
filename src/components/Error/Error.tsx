import React from 'react';
import styles from './Error.module.scss';
import { useNavigate } from 'react-router-dom';

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.Error}>
      <p className={styles.Error__message} style={{ color: 'red' }}>
        Something went wrong
      </p>
      <button
        type="button"
        className={styles.Error__button}
        onClick={() => navigate(0)}
      >
        Reload page
      </button>
    </div>
  );
};
