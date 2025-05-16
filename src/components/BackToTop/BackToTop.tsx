import React from 'react';
import classNames from 'classnames';

import { ArrowUpIcon } from '../icons';

import styles from './BackToTop.module.scss';

type Props = {
  className?: string;
};

export const BackToTop: React.FC<Props> = ({ className = '' }) => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={classNames(styles['back-to-top'], className)}
      onClick={goToTop}
    >
      <span className={styles['back-to-top__text']}>Back to top</span>
      <ArrowUpIcon className={styles['back-to-top__icon']} />
    </button>
  );
};
