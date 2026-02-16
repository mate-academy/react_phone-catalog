import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonBack.module.scss';

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.buttonBack}>
      <button className={styles.buttonBackWrapper} onClick={() => navigate(-1)}>
        <img
          src="img/icons/arrow-left.svg"
          alt="back button"
          className={styles.buttonBackIcon}
        />
        <p className={styles.buttonBackText}>Back</p>
      </button>
    </div>
  );
};
