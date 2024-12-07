import { useState } from 'react';

import Swiper from 'swiper';
import { Thumbs } from 'swiper/modules';
import { SwiperProps } from 'swiper/react';

import { useMedia } from '@shared/hooks/useMedia';

export const useProductGallery = () => {
  const { isMobile, isDesktop } = useMedia();

  const [mainSlider, setMainSlider] = useState<Swiper | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);

  const mainSliderConfig = {
    modules: [Thumbs],
    thumbs: {
      swiper: thumbsSwiper,
    },
    onSwiper: setMainSlider,
  };

  const thumbsSliderConfig: SwiperProps = {
    modules: [Thumbs],
    slidesPerView: 'auto',
    direction: isMobile ? 'horizontal' : 'vertical',
    spaceBetween: isDesktop ? 16 : 8,
    onSwiper: setThumbsSwiper,
  };

  return {
    thumbsSwiper,
    mainSlider,
    mainSliderConfig,
    thumbsSliderConfig,
  };
};
