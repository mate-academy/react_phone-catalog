/* eslint-disable max-len */
import React from 'react';
import styles from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.button}>
        <img src="images/Chevron (Arrow Left).svg" alt="PrevArr" className={styles.arrow} />
        <span className={styles.title}>Back</span>
      </button>
    </div>
  );
};
