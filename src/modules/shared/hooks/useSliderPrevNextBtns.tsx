import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

export const useSliderPrevNextBtns = (
  sliderApi: EmblaCarouselType | undefined,
) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const handlePrev = useCallback(() => {
    if (!sliderApi) {
      return;
    }

    sliderApi.plugins().autoplay?.reset();
    sliderApi.scrollPrev();
  }, [sliderApi]);

  const handleNext = useCallback(() => {
    if (!sliderApi) {
      return;
    }

    sliderApi.plugins().autoplay?.reset();
    sliderApi.scrollNext();
  }, [sliderApi]);

  const onSelect = useCallback((sliderApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!sliderApi.canScrollPrev());
    setNextBtnDisabled(!sliderApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!sliderApi) {
      return;
    }

    onSelect(sliderApi);
    sliderApi.on('reInit', onSelect).on('select', onSelect);
  }, [sliderApi, onSelect]);

  return {
    handlePrev,
    handleNext,
    prevBtnDisabled,
    nextBtnDisabled,
  };
};
