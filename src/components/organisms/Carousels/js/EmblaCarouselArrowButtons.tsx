import { useCallback, useSyncExternalStore } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!emblaApi) return () => {};

      emblaApi.on('reInit', onChange).on('select', onChange);
      return () => {
        emblaApi.off('reInit', onChange).off('select', onChange);
      };
    },
    [emblaApi],
  );

  const getSnapshot = useCallback(() => {
    if (!emblaApi) return 0;
    return (
      (emblaApi.canScrollPrev() ? 1 : 0) | (emblaApi.canScrollNext() ? 2 : 0)
    );
  }, [emblaApi]);

  const scrollability = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot,
  );
  const prevBtnDisabled = (scrollability & 1) === 0;
  const nextBtnDisabled = (scrollability & 2) === 0;

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
