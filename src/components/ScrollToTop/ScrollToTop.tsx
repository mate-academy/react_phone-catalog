import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import styles from './ScrollToTop.module.scss';

type Props = {
  defaultText?: string;
  text?: string;
};

export const ScrollToTop: React.FC<Props> = ({
  text,
  defaultText = 'Back to top',
}) => {
  const handleScroll = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button className={styles['scroll-to-top']} onClick={handleScroll}>
      <span className={styles['scroll-to-top__text']}>
        {text?.length ? text : defaultText}
      </span>
      <div className={styles['scroll-to-top__icon']}>
        <IoIosArrowForward className={styles['scroll-to-top__icon-arrow']} />
      </div>
    </button>
  );
};
