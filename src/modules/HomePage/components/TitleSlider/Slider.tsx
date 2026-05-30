import React, { useRef } from 'react';
// eslint-disable-next-line max-len
import { AnimatedSlides } from '../../../shared/Shared_Components/AnimatedComponents/AnimatedSlides';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { swipeLeft, swipeRight } from '../../helpers/sliderFunctions';

export const Slider = () => {
  const activeSlide = useAppSelector(s => s.activeSlideReducer);
  const dispatch = useAppDispatch();

  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) {
      return;
    }

    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isRightSwipe) {
      swipeRight({ activeSlide, dispatch });
    } else if (isLeftSwipe) {
      swipeLeft({ activeSlide, dispatch });
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="slider__slides"
    >
      <AnimatedSlides />
    </div>
  );
};
