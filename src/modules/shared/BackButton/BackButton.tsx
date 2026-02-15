import React from 'react';
import styles from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../hooks/useAppContext';
import { themeIconBack } from '../../../utils/iconsTheme';

export const BackButton = () => {
  const { state } = useAppContext();
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
      <img src={themeIconBack(state.theme)} alt="" />
      <button onClick={handleBack} className={styles.back__button}>
        Back
      </button>
    </div>
  );
};
