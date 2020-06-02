import React, { useCallback } from 'react';
import classNames from 'classnames';
import { DIRECTIONS } from '../../common/constants';

export const SliderControl = ({
  handleSlide,
  direction,
  position,
  maxPosition,
}: SliderArrowProps) => {
  const isLeft = direction === DIRECTIONS.left;
  const isRight = direction === DIRECTIONS.right;
  const isStart = position === 0;
  const isEnd = position === maxPosition;

  const onSlide = useCallback(
    () => handleSlide(direction),
    [handleSlide, direction],
  );

  return (
    <button
      type="button"
      aria-label={`Slide ${direction}`}
      className={classNames({
        slider__button: true,
        [`slider__button-${direction}`]: true,
      })}
      onClick={onSlide}
      disabled={(isLeft && isStart)
      || (isRight && isEnd)}
    />
  );
};
