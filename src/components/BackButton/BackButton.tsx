import styles from './BackButton.module.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import arrowLeftIcon from '../../images/icons/arrow-left.svg';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" className={styles.backButton} onClick={handleGoBack}>
      <img
        src={arrowLeftIcon}
        alt="Arrow left"
        className={styles.backButton__icon}
      />
      <span className={styles.backButton__text}>Back</span>
    </button>
  );
};
