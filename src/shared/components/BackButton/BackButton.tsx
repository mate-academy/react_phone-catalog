import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICON_PATHS } from '../../constants/IconPaths';

import styles from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className={styles.backButton} onClick={handleGoBack}>
      <img
        src={ICON_PATHS.arrowLeft}
        alt="Back"
        className={styles.backButton__backIcon}
      />
      Back
    </button>
  );
};
