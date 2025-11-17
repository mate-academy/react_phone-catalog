import { useState } from 'react';
import type { SwiperClass } from 'swiper/react';

interface Output {
  showImages: boolean;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
  onSwiperInit: (swiperInstance: SwiperClass) => void;
}

export const MainSlider = (): Output => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const handlePrevSlide = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const onSwiperInit = (swiperInstance: SwiperClass) => {
    setSwiper(swiperInstance);
  };

  return {
    showImages: true,
    handlePrevSlide,
    handleNextSlide,
    onSwiperInit,
  };
};
