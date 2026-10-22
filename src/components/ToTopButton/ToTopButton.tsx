import type React from 'react';
import styles from './ToTopButton.module.scss';
import { asset } from '../../helper';

export const ToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles['top-button']}>
      <span className={styles.text}>Back to top</span>
      <button onClick={scrollToTop}>
        <img src={asset('/img/top-button.svg')} alt="" />
      </button>
    </div>
  );
};
