import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ButtonBack.module.scss';
import { Icon } from '../Icon/Icon';
import { icons } from '../../constants/icons';

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.button} onClick={handleBack}>
      <Icon icon={icons.arrow_left} />
      <div className={styles.button__title}>Back</div>
    </div>
  );
};
