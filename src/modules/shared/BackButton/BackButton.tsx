import React from 'react';
import styles from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../../api/utilis';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.back}>
      <img src={getAssetUrl('icons/arrow_left_back.svg')} alt="" />
      <button onClick={handleBack} className={styles.back__button}>
        Back
      </button>
    </div>
  );
};
