import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackLink.module.scss';

export const BackLink: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={styles.backLink}
    >
      ‹ Back
    </button>
  );
};
