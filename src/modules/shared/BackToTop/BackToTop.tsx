import React from 'react';
import styles from './BackToTop.module.scss';

const moveToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export const BackToTop: React.FC = () => {
  return (
    <button className={styles['back-to-top']} onClick={moveToTop}>
      Back to top
    </button>
  );
};
