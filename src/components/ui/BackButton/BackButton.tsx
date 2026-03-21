import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react'; // Upewnij się, że masz ikonę strzałki w lewo
import styles from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleBack} className={styles.backButton}>
      <ArrowLeft className={styles.backButton__icon} />
      <span className={styles.backButton__text}>Back</span>
    </button>
  );
};
