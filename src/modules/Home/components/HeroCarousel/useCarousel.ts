import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export const useCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 }, [
    Autoplay({ playOnInit: true, delay: 5000, stopOnInteraction: true }),
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const createHandleSlideChange = (cb: () => void) => () => {
    cb();
    emblaApi?.plugins().autoplay?.stop();
  };

  useEffect(() => {
    const handleSelection = () => {
      if (emblaApi) {
        setCurrentSlide(emblaApi.selectedScrollSnap);
      }
    };

    emblaApi?.on('init', handleSelection).on('select', handleSelection);

    return () => {
      emblaApi?.off('init', handleSelection).off('select', handleSelection);
    };
  }, [emblaApi]);

  return {
    selectNext: createHandleSlideChange(() => emblaApi?.scrollNext()),
    selectPrev: createHandleSlideChange(() => emblaApi?.scrollPrev()),
    createSelectByIndex: (index: number) =>
      createHandleSlideChange(() => emblaApi?.scrollTo(index)),
    currentSlide,
    carouselRef: emblaRef,
  };
};
