/* eslint-disable operator-linebreak */
import React from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  infinite?: boolean;
  clonedBefore: React.ReactNode[];
  clonedAfter: React.ReactNode[];
  offset: number;
  durationAnimation: number;
  className: string;
  cypressParam?: string | null;
};

export const SliderTrack: React.FC<Props> = ({
  children,
  infinite = false,
  clonedBefore,
  clonedAfter,
  offset,
  durationAnimation,
  className,
  cypressParam = null,
}) => {
  return (
    <div
      className={clsx('slider__track', className && `${className}__track`)}
      style={{
        transform: `translateX(${offset}px)`,
        transition: `transform ${durationAnimation}ms ease-in-out`,
      }}
      data-cy={cypressParam}
    >
      {infinite &&
        clonedBefore &&
        clonedBefore.map((clonedSlide, index) => (
          <div key={`${index + 999}`}>{clonedSlide}</div>
        ))}
      {children}
      {infinite &&
        clonedAfter &&
        clonedAfter.map((clonedSlide, index) => (
          <div key={`${index + 999}`}>{clonedSlide}</div>
        ))}
    </div>
  );
};
