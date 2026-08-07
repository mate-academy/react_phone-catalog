import React from 'react';
import styles from './ScrollToTopBtn.module.scss';
import ArrowTop from '@public/img/icons/icon-arrow.svg?react';

export const ScrollToTopBtn: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={styles.scrollToTopBtn}
      onClick={handleClick}
    >
      <ArrowTop className={styles.scrollToTopIcon} />
    </button>
  );
};
