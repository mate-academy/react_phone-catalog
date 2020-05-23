import React from 'react';
import classNames from 'classnames';

export const SliderControl = ({
  handleSlide,
  direction,
  position,
  maxPosition,
}: SliderArrowProps) => (
  <button
    type="button"
    className={classNames({
      slider__button: true,
      [`slider__button-${direction}`]: true,
      'slider__button--disabled': (direction === 'left' && position === 0)
        || (direction === 'right' && position === maxPosition),
    })}
    onClick={() => handleSlide(direction)}
    disabled={(direction === 'left' && position === 0)
    || (direction === 'right' && position === maxPosition)}
  />
);
