import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button className={styles.backButton} onClick={handleClick}>
      <span className={styles.icon}>❮</span>
      <span className={styles.text}>Back</span>
    </button>
  );
};
