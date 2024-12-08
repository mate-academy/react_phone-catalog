import { useCallback, useMemo, useRef, useState } from 'react';

import SwiperType from 'swiper';
import { Navigation } from 'swiper/modules';
import { SwiperProps } from 'swiper/react';

import { useMedia } from '@shared/hooks/useMedia';

export interface UseSliderProps {
  onSlideChange?: VoidFunction;
}

export const useSlider = ({ onSlideChange }: UseSliderProps) => {
  const { isDesktop } = useMedia();
  const swiperRef = useRef<SwiperType>();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const slidesPerView = useMemo(
    () => (isDesktop ? 4 : ('auto' as const)),
    [isDesktop],
  );

  const setSliderPositions = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);

    setIsEnd(swiper.isEnd);
  };

  const settings = useMemo(
    () =>
      ({
        modules: [Navigation],
        slidesPerView,
        spaceBetween: 16,
        onUpdate: (swiper: SwiperType) => {
          setSliderPositions(swiper);
        },
        onBeforeInit: (swiper: SwiperType) => {
          swiperRef.current = swiper;
        },
        onInit: (swiper: SwiperType) => {
          setSliderPositions(swiper);
        },
        onSlideChange: (swiper: SwiperType) => {
          setSliderPositions(swiper);

          if (!onSlideChange) {
            return;
          }

          if (swiper.isEnd) {
            onSlideChange();
          }
        },
      }) as Omit<SwiperProps, 'children'>,
    [slidesPerView, onSlideChange],
  );

  const onButtonNext = useCallback(() => swiperRef.current?.slideNext(), []);

  const onButtonPrev = useCallback(() => swiperRef.current?.slidePrev(), []);

  return {
    settings,
    isBeginning,
    isEnd,
    swiper: swiperRef?.current,
    onButtonNext,
    onButtonPrev,
  };
};
