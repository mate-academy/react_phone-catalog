import { useCallback, useMemo, useRef } from 'react';

import SwiperType from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { useMedia } from '@shared/hooks/useMedia';
import { extractBreakPoints } from '@shared/utils/helpers';

export const useHeroSlider = () => {
  const { isMobile } = useMedia();

  const swiperRef = useRef<SwiperType>();

  const [desktopBreakpoint, tabletBreakpoint] = extractBreakPoints();

  const settings = useMemo(
    () => ({
      modules: [Pagination, Autoplay, Navigation],
      pagination: { clickable: true },
      slidesPerGroup: 1,
      spaceBetween: 16,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      onBeforeInit: (swiper: SwiperType) => {
        swiperRef.current = swiper;
      },
      loop: true,
    }),
    [],
  );

  const showButtons = useMemo(() => !isMobile, [isMobile]);

  const onSwipeNext = useCallback(() => swiperRef.current?.slideNext(), []);

  const onSwipePrev = useCallback(() => swiperRef.current?.slidePrev(), []);

  return {
    showButtons,
    desktopBreakpoint,
    tabletBreakpoint,
    settings,
    onSwipeNext,
    onSwipePrev,
  };
};
