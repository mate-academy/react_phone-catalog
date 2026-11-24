import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import styles from './Navigation.module.scss';

type Props = {
  onClickPrev?: () => void;
  onClickNext?: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  customClassName?: string;
  hiddenButton?: 'prev' | 'next';
};

export const Navigation: React.FC<Props> = ({
  onClickPrev,
  onClickNext,
  disabledPrev,
  disabledNext,
  customClassName,
  hiddenButton = '',
}) => {
  return (
    <div className={styles.navigation}>
      {hiddenButton !== 'prev' && (
        <button
          type="button"
          className={`${styles.navigation__button} ${customClassName ? styles[`${customClassName}`] : ''}`}
          disabled={disabledPrev}
          onClick={onClickPrev}
        >
          <IoIosArrowForward
            className={`${styles['navigation__button-icon']} ${styles['navigation__button-icon--prev']}`}
          />
        </button>
      )}
      {hiddenButton !== 'next' && (
        <button
          type="button"
          className={`${styles.navigation__button} ${customClassName ? styles['navigation__button-custom'] : ''}`}
          disabled={disabledNext}
          onClick={onClickNext}
        >
          <IoIosArrowForward className={styles['navigation__button-icon']} />
        </button>
      )}
    </div>
  );
};
