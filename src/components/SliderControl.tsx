import React from 'react';
import classNames from 'classnames';

export const SliderControl = ({
  handleSlide,
  direction,
  position,
  maxPosition,
}: SliderArrowProps) => {
  const dirLeft = direction === 'left';
  const dirRight = direction === 'right';
  const posStart = position === 0;
  const posMax = position === maxPosition;

  return (
    <button
      type="button"
      aria-label={dirLeft ? 'Slide left' : 'Slide right'}
      className={classNames({
        slider__button: true,
        [`slider__button-${direction}`]: true,
        'slider__button--disabled': (dirLeft && posStart)
          || (dirRight && posMax),
      })}
      onClick={() => handleSlide(direction)}
      disabled={(dirLeft && posStart)
      || (dirRight && posMax)}
    />
  );
};
