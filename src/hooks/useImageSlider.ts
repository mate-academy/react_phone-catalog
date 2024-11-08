import { useEffect, useState } from 'react';

import { ISliderImage } from '@utils/types/sliderImage.interface';

const MIN_SWIPE_DISTANCE = 50;

export const useImageSlider = (IMAGES: ISliderImage[]) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const lastIndex = IMAGES.length - 1;

  const showNextImage = () => {
    setImgIndex(index => (index === lastIndex ? 0 : index + 1));
  };

  const showPrevImage = () => {
    setImgIndex(index => (index === 0 ? lastIndex : index - 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > MIN_SWIPE_DISTANCE) {
      showNextImage();
    } else if (swipeDistance < -MIN_SWIPE_DISTANCE) {
      showPrevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const goToImage = (index: number) => {
    setImgIndex(index);
  };

  useEffect(() => {
    const slider = setInterval(showNextImage, 5000);
    return () => clearInterval(slider);
  }, [imgIndex, lastIndex]);

  return {
    imgIndex,
    showPrevImage,
    showNextImage,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    goToImage,
  };
};
