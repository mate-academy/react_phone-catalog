import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './GoBack.module.scss';

export const GoBack: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={styles.goBackText}>
      <div className={styles.label} onClick={handleGoBack}>
        Back
      </div>
    </div>
  );
};
