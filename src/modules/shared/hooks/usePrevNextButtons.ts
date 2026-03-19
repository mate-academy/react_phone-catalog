import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.goToPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.goToNext();
  }, [emblaApi]);

  const onSelect = useCallback((embla: EmblaCarouselType) => {
    setPrevBtnDisabled(!embla.canGoToPrev());
    setNextBtnDisabled(!embla.canGoToNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    requestAnimationFrame(() => onSelect(emblaApi));
    emblaApi.on('reinit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
