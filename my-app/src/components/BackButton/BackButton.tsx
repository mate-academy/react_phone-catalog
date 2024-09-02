import React from 'react';
import styles from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }

  return (
    <button className={styles.buttonBack} onClick={goBack}>
      <span className={styles.arrowBack}></span>
      Back
    </button>
  );
};
