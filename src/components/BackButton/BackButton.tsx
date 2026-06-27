import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className={styles.backButton} onClick={handleGoBack}>
      <img src="/icons/arrow-left.svg" alt="Back" className={styles.icon} />
      <span className={styles.text}>Back</span>
    </button>
  );
};
