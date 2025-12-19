import { EmblaCarouselType } from 'embla-carousel';
import { useCallback, useEffect, useState } from 'react';

export const useSliderDots = (sliderApi: EmblaCarouselType | undefined) => {
  const [dots, setDots] = useState<number[]>([]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);

  const handleDotClick = useCallback(
    (index: number) => {
      if (!sliderApi) {
        return;
      }

      sliderApi.scrollTo(index);
    },
    [sliderApi],
  );

  const onInit = useCallback((sliderApi: EmblaCarouselType) => {
    setDots(sliderApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((sliderApi: EmblaCarouselType) => {
    setSelectedSlideIndex(sliderApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!sliderApi) {
      return;
    }

    onInit(sliderApi);
    onSelect(sliderApi);
    sliderApi
      .on('reInit', onInit)
      .on('reInit', onSelect)
      .on('select', onSelect);
  }, [sliderApi, onInit, onSelect]);

  return {
    selectedIndex: selectedSlideIndex,
    onDotClick: handleDotClick,
    dots,
  };
};
