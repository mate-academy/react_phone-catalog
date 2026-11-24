import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import styles from './ScrollToTop.module.scss';

type Props = {
  text?: string;
};

export const ScrollToTop: React.FC<Props> = ({ text }) => {
  const handleScroll = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={styles['scroll-to-top']}
      onClick={handleScroll}
      aria-label="Scroll to top"
    >
      {text && <span className={styles['scroll-to-top__text']}>{text}</span>}
      <div className={styles['scroll-to-top__icon']}>
        <IoIosArrowForward className={styles['scroll-to-top__icon-arrow']} />
      </div>
    </button>
  );
};
