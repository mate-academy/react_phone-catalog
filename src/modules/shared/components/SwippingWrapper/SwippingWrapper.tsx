import { useState } from 'react';
import './SwippingWrapper.scss';
import React from 'react';

type Props = {
  children: React.ReactNode;
  slidePosition: number;
  handleChangeSlidePosition: (e: number) => void;
};

export const SwippingWrapper: React.FC<Props> = ({
  children,
  slidePosition,
  handleChangeSlidePosition,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 15;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      return isLeftSwipe
        ? handleChangeSlidePosition(slidePosition + 1)
        : handleChangeSlidePosition(slidePosition - 1);
    }

    return;
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {children}
    </div>
  );
};
