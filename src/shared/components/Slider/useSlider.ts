import { useCallback, useMemo, useRef, useState } from 'react';

import SwiperType from 'swiper';
import { Navigation } from 'swiper/modules';
import { SwiperProps } from 'swiper/react';

import { useMedia } from '@shared/hooks/useMedia';

export interface UseSliderProps {
  onSwiperReachEnd?: VoidFunction;
  onSwiperReachStart?: VoidFunction;
}

export const useSlider = ({
  onSwiperReachEnd,
  onSwiperReachStart,
}: UseSliderProps) => {
  const { isDesktop } = useMedia();
  const swiperRef = useRef<SwiperType>();

  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(false);

  const slidesPerView = useMemo(
    () => (isDesktop ? 4 : ('auto' as const)),
    [isDesktop],
  );

  const settings = useMemo(
    () =>
      ({
        modules: [Navigation],
        slidesPerView,
        spaceBetween: 16,
        onBeforeInit: (swiper: SwiperType) => {
          swiperRef.current = swiper;
        },
        onInit: (swiper: SwiperType) => {
          setIsEnd(swiper.isEnd);
          setIsBeginning(swiper.isBeginning);
        },
        onSlideChange: swiper => {
          if (swiper.isEnd) {
            setIsEnd(swiper.isEnd);

            if (onSwiperReachEnd) {
              onSwiperReachEnd();
            }
          }

          if (swiper.isBeginning) {
            setIsBeginning(swiper.isBeginning);
            if (onSwiperReachStart) {
              onSwiperReachStart();
            }
          }
        },
      }) as Omit<SwiperProps, 'children'>,
    [],
  );

  const onButtonNext = useCallback(() => swiperRef.current?.slideNext(), []);

  const onButtonPrev = useCallback(() => swiperRef.current?.slidePrev(), []);

  return {
    settings,
    swiper: swiperRef?.current,
    isEnd,
    isBeginning,
    onButtonNext,
    onButtonPrev,
  };
};
