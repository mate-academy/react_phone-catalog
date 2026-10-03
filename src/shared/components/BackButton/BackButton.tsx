import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
const arrowLeftIcon = 'img/icons/Chevron (Arrow Left).svg';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.backButton}
      onClick={() => navigate(-1)}
    >
      <img src={arrowLeftIcon} alt="<" className={styles.icon} />
      <span>Back</span>
    </button>
  );
};
