import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import backIcon from '/icons/arrow_left_active.svg';

import styles from './GoBackButton.module.scss';
import clsx from 'clsx';

export const GoBackButton: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = useCallback(() => {
    const fromPath = (location.state as { from?: string })?.from;
    if (fromPath) {
      navigate(fromPath);
    } else {
      navigate(-1);
    }
  }, [navigate, location.state]);

  return (
    <button
      onClick={handleGoBack}
      className={styles.backButton}
    >
      <img
        src={backIcon}
        alt="back button"
        className={clsx(styles.backIcon, 'app-icon')}
      />
      Back
    </button>
  );
};
