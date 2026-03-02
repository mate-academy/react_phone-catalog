import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button type="button" className={styles.backButton} onClick={handleBack}>
      <img src="/img/icons/arrow-left.svg" alt="" aria-hidden="true" />
      Back
    </button>
  );
};
