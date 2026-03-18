import React from 'react';
import { PicturesSliderButton } from '../Buttons/PicturesSliderButton';
import { useCarousel } from '../../hooks/useCarousel';
import { useAutoSlide } from '../../hooks/useAutoSlide';
import {
  SLIDE_DELAY_MS,
  SWIPE_THRESHOLD_PX,
} from '../../constants/picturesSlider';
import styles from './PicturesSlider.module.scss';
import cn from 'classnames';

type Props = {
  data: string[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
};
export const PicturesSlider: React.FC<Props> = props => {
  const { data, currentSlide, onSlideChange } = props;
  const { goNext, goPrev, swipeHandlers } = useCarousel({
    currentIndex: currentSlide,
    totalItems: data.length,
    onChange: onSlideChange,
    swipeThresholdPx: SWIPE_THRESHOLD_PX,
  });

  useAutoSlide({
    currentSlide,
    totalSlides: data.length,
    delayMs: SLIDE_DELAY_MS,
    onNext: goNext,
  });

  return (
    <div className={styles.slider}>
      <div className={styles.carousel}>
        <PicturesSliderButton direction="left" onClick={goPrev} />

        <div className={styles.viewport} {...swipeHandlers}>
          <img
            key={data[currentSlide]}
            src={data[currentSlide]}
            alt={`Picture ${currentSlide + 1}`}
            className={styles.image}
          />
        </div>

        <PicturesSliderButton direction="right" onClick={goNext} />
      </div>

      <ul className={styles.indicators}>
        {data.map((_, index) => (
          <li key={index} className={styles.indicator}>
            <button
              type="button"
              className={cn(styles.indicatorButton, {
                [styles.indicatorButtonActive]: currentSlide === index,
              })}
              onClick={() => onSlideChange(index)}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
};
