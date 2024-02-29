import React from 'react';
import clsx from 'clsx';

type Props = {
  dots: number[];
  bemBlock: string;
  activeDot: number;
  handleClickDot: (numberDot: number) => void;
};

export const SliderNavDots: React.FC<Props> = ({
  dots,
  bemBlock: className,
  activeDot,
  handleClickDot,
}) => {
  return (
    <div className={clsx('slider__dots', className && `${className}__dots`)}>
      {dots.map(number => (
        <button
          key={number}
          className={clsx('slider__dot', className && `${className}__dot`, {
            active: activeDot === number,
          })}
          type="button"
          aria-label="dot"
          onClick={() => handleClickDot(number)}
        />
      ))}
    </div>
  );
};
