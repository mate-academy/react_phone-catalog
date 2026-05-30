import React from 'react';
import classNames from 'classnames';
import { Slide } from '../../../../../../types';

type SlideControlsProps = {
  slides: Slide[] | null;
  currentIndex: number;
  handleControlClick: (index: number) => void;
};

export const SlideControls: React.FC<SlideControlsProps> = ({
  slides,
  currentIndex,
  handleControlClick,
}) => {
  return (
    <div className="banner-slider__controls">
      {slides &&
        slides.map((_, index) => (
          <div
            key={index}
            className={classNames('banner-slider__control', {
              active: index === currentIndex,
            })}
            onClick={() => handleControlClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></div>
        ))}
    </div>
  );
};
