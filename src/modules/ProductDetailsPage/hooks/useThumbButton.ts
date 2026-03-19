import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UseThumbButtonType = {
  selectedIndex: number;
  onThumbButtonClick: (index: number) => void;
};

export const useThumbButton = (
  emblaMainApi: EmblaCarouselType | undefined,
  emblaThumbsApi: EmblaCarouselType | undefined,
): UseThumbButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbButtonClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) {
        return;
      }

      emblaMainApi.goTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) {
      return;
    }

    setSelectedIndex(emblaMainApi.selectedSnap());
    emblaThumbsApi.goTo(emblaMainApi.selectedSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) {
      return;
    }

    requestAnimationFrame(() => onSelect());
    emblaMainApi.on('select', onSelect).on('reinit', onSelect);
  }, [emblaMainApi, onSelect]);

  return {
    selectedIndex,
    onThumbButtonClick,
  };
};
