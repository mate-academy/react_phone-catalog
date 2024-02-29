/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import clsx from 'clsx';
import { SliderContext } from './Slider';

type Props = {
  children: React.ReactNode;
};

export const SliderItem: React.FC<Props> = ({ children }) => {
  const { slideWidth, className } = useContext(SliderContext);

  return (
    <div
      className={clsx('slider__item', className && `${className}__item`)}
      style={{ width: `${slideWidth}px` }}
    >
      {children}
    </div>
  );
};
