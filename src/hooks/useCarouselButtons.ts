import { UseEmblaCarouselType } from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

export const useCarouselButtons = (
  carouselApi: UseEmblaCarouselType[1] | undefined,
) => {
  const [isDisabled, setIsDisabled] = useState({ prev: true, next: true });

  const handleNextClick = useCallback(
    () => carouselApi?.scrollNext(),
    [carouselApi],
  );
  const handlePrevClick = useCallback(
    () => carouselApi?.scrollPrev(),
    [carouselApi],
  );

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateDisabled = () => {
      setIsDisabled({
        next: !carouselApi.canScrollNext(),
        prev: !carouselApi.canScrollPrev(),
      });
    };

    updateDisabled();

    carouselApi
      .on('init', updateDisabled)
      .on('reInit', updateDisabled)
      .on('select', updateDisabled);

    return () => {
      carouselApi
        .off('init', updateDisabled)
        .off('reInit', updateDisabled)
        .off('select', updateDisabled);
    };
  }, [carouselApi]);

  return {
    handleNextClick,
    handlePrevClick,
    isDisabled,
  };
};
