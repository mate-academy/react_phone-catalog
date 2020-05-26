import React from 'react';
import classNames from 'classnames';
import { DIRECTIONS } from '../../helpers/directions';

export const SliderControl = ({
  handleSlide,
  direction,
  position,
  maxPosition,
}: SliderArrowProps) => {
  const isLeft = direction === DIRECTIONS.left;
  const isRight = direction === DIRECTIONS.right;
  const isStart = position === 0;
  const isMax = position === maxPosition;

  return (
    <button
      type="button"
      aria-label={`Slide ${direction}`}
      className={classNames({
        slider__button: true,
        [`slider__button-${direction}`]: true,
      })}
      onClick={() => handleSlide(direction)}
      disabled={(isLeft && isStart)
      || (isRight && isMax)}
    />
  );
};
