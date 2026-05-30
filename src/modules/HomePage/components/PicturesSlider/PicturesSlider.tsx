import React, { useCallback } from 'react';
import classNames from 'classnames';

import { PictureSlideData } from '../../types';
import { useSlideIndexDragSlider } from '../../../../hooks';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../../components';
import { SlideIndicators, PictureSlide } from './components';

import styles from './PicturesSlider.module.scss';

type Props = {
  className?: string;
  slides: PictureSlideData[];
};

export const PicturesSlider: React.FC<Props> = ({ className = '', slides }) => {
  const {
    wrapperRef,
    listRef,

    preparedSlides,
    visibleSlideIndex,
    currentIndex,
    goToIndex,

    isDragging,
    dragHandlers,
  } = useSlideIndexDragSlider<PictureSlideData>({
    slides,
    threshold: 100,
    autoScrollInterval: 5000,
    loop: true,
  });

  const handleNext = useCallback(() => {
    goToIndex(Math.min(currentIndex + 1, slides.length + 1));
  }, [currentIndex, goToIndex, slides.length]);

  const handlePrev = useCallback(() => {
    goToIndex(Math.max(currentIndex - 1, 0));
  }, [currentIndex, goToIndex]);

  return (
    <div className={classNames(styles['pictures-slider'], className)}>
      <button
        onClick={handlePrev}
        className={classNames(
          styles['pictures-slider__button'],
          styles['pictures-slider__button--left'],
        )}
      >
        <ArrowLeftIcon className={styles['pictures-slider__icon']} />
      </button>

      <div
        ref={wrapperRef}
        className={classNames(styles['pictures-slider__wrapper'], {
          [styles['pictures-slider__wrapper--dragging']]: isDragging,
        })}
        {...dragHandlers}
      >
        <ul className={styles['pictures-slider__list']} ref={listRef}>
          {preparedSlides.map((slide, index) => (
            <PictureSlide
              key={slide.img + index}
              className={styles['pictures-slider__item']}
              slide={slide}
            />
          ))}
        </ul>
      </div>

      <button
        onClick={handleNext}
        className={classNames(
          styles['pictures-slider__button'],
          styles['pictures-slider__button--right'],
        )}
      >
        <ArrowRightIcon className={styles['pictures-slider__icon']} />
      </button>

      <SlideIndicators
        className={styles['pictures-slider__indicators']}
        slides={slides}
        currentSlideIndex={visibleSlideIndex}
        onClick={goToIndex}
      />
    </div>
  );
};
