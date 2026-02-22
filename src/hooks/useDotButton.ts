import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return;
      }

      emblaApi.goTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((embla: EmblaCarouselType) => {
    setScrollSnaps(embla.snapList());
  }, []);

  const onSelect = useCallback((embla: EmblaCarouselType) => {
    setSelectedIndex(embla.selectedSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    requestAnimationFrame(() => onInit(emblaApi));
    requestAnimationFrame(() => onSelect(emblaApi));
    // onInit(emblaApi);
    // onSelect(emblaApi);

    emblaApi.on('reinit', onInit).on('reinit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};
