import React from 'react';
import styles from './skip.module.scss';
import classNames from 'classnames';

export const SkipButton: React.FC = ({
  handleSkip,
  handleSkipBack,
  currentIndex,
}) => {
  return (
    <>
      <div className={styles.skip__product}>
        <button
          disabled={currentIndex === 0}
          className={classNames(styles['skip__product-button'], {
            [styles['skip__product-button--disabled']]: currentIndex === 0,
          })}
          onClick={handleSkipBack}
        >
          <img
            className={`${styles['skip__product-skip']} ${styles['skip__product-skip--left']}`}
            src="/img/arrow.png"
            alt=""
          />
        </button>
        <button className={styles['skip__product-button']} onClick={handleSkip}>
          <img
            className={styles['skip__product-skip']}
            src="/img/arrow.png"
            alt=""
          />
        </button>
      </div>
    </>
  );
};
