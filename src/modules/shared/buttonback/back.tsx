import React from 'react';
import styles from './back.module.scss';

export const BackButton: React.FC = ({ onBack }) => {
  return (
    <>
      <button className={styles.breadcrumbs__button} onClick={onBack}>
        Back
      </button>
    </>
  );
};
