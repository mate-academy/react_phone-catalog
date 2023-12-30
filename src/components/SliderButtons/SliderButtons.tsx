import './SliderButtons.scss';
import React from 'react';
import classNames from 'classnames';

type LeftButtonProps = {
  onSlideLeft: () => void,
  isDisabled: boolean,
};

export const SliderButtonLeft: React.FC<LeftButtonProps> = ({
  onSlideLeft,
  isDisabled,
}) => {
  return (
    <button
      type="button"
      aria-label="button"
      className={classNames('left-button', {
        disabled: isDisabled,
      })}
      onClick={onSlideLeft}
    >
      <div className="icon icon-left" />
    </button>
  );
};

type RightButtonProps = {
  onSlideRight: () => void,
  isDisabled: boolean,
};

export const SliderButtonRight: React.FC<RightButtonProps> = ({
  onSlideRight,
  isDisabled,
}) => {
  return (
    <button
      type="button"
      aria-label="button"
      className={classNames('right-button', {
        disabled: isDisabled,
      })}
      onClick={onSlideRight}
    >
      <div className="icon icon-right" />
    </button>
  );
};
