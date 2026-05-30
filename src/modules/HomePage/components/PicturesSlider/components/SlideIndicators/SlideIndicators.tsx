import React from 'react';
import classNames from 'classnames';

import { PictureSlideData } from '../../../../types';

import styles from './SlideIndicators.module.scss';

type Props = {
  className?: string;
  slides: PictureSlideData[];
  currentSlideIndex: number;
  onClick: (index: number) => void;
};

export const SlideIndicators: React.FC<Props> = ({
  className = '',
  slides,
  currentSlideIndex,
  onClick,
}) => {
  return (
    <div className={classNames(styles.indicators, className)}>
      <ul className={styles.indicators__list}>
        {slides.map((slide, index) => (
          <li key={slide.img + index} className={styles.indicators__item}>
            <button
              onClick={() => onClick(index + 1)}
              className={styles.indicators__button}
            >
              <div
                className={classNames(styles.indicators__rectangle, {
                  [styles['indicators__rectangle--active']]:
                    currentSlideIndex === index,
                })}
              ></div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
