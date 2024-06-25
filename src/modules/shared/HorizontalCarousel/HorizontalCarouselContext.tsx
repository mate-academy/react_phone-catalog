import React, { FC, PropsWithChildren, createContext, useContext } from 'react';

import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';

type State = {
  carouselApi: UseEmblaCarouselType;
};

const HorizontalCarouselContext = createContext<State | null>(null);

export const useHorizontalCarousel = () => {
  const carouselApi = useContext(HorizontalCarouselContext);

  if (!carouselApi) {
    throw new Error('HorizontalCarouselProvider was not found');
  }

  return carouselApi;
};

export const HorizontalCarouselProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const carouselApi = useEmblaCarousel({
    align: 'center',
    duration: 20,
    skipSnaps: true,
    dragFree: false,
    breakpoints: {
      '(min-width: 1200px)': { align: 'start' },
    },
  });

  return (
    <HorizontalCarouselContext.Provider value={{ carouselApi: carouselApi }}>
      {children}
    </HorizontalCarouselContext.Provider>
  );
};
