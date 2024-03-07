import React from 'react';
import clsx from 'clsx';
import { Button, Icon } from '../../base';

import './Slider.scss';

type Props = {
  direction: 'right' | 'left';
  onClickHandler: () => void;
  disabled?: boolean;
  className?: string;
};

export const SliderButton: React.FC<Props> = ({
  direction,
  onClickHandler,
  disabled = false,
  className = '',
}) => {
  const type = direction === 'left' ? 'prev' : 'next';

  return (
    <Button
      type="default"
      className={clsx('slider__arrow ', `slider__arrow--${type}`, [
        className && [`${className}__arrow`, `${className}__arrow--${type}`],
      ])}
      disabled={disabled}
      onClickHandler={onClickHandler}
    >
      <Icon
        id={`arrow-${direction}`}
        width={16}
        height={16}
        className="arrow__icon"
      />
    </Button>
  );
};
