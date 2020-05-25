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
      aria-label={`Slide ${direction}`}
      className={classNames({
        slider__button: true,
        [`slider__button-${direction}`]: true,
      })}
      onClick={() => handleSlide(direction)}
      disabled={(dirLeft && posStart)
      || (dirRight && posMax)}
    />
  );
};
