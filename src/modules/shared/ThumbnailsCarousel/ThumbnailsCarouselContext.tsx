import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';

type State = {
  carousel: UseEmblaCarouselType;
  slides: ReactNode[];
};

const ThumbnailsCarouselContext = createContext<State | null>(null);

type Props = PropsWithChildren<{ slides: ReactNode[] }>;

export const ThumbnailsCarouselProvider: FC<Props> = ({ children, slides }) => {
  const carousel = useEmblaCarousel();

  return (
    <ThumbnailsCarouselContext.Provider value={{ carousel, slides }}>
      {children}
    </ThumbnailsCarouselContext.Provider>
  );
};

export const useThumbnailsCarousel = () => {
  const context = useContext(ThumbnailsCarouselContext);

  if (!context) {
    throw new Error('No ThumbnailsCarouselProvider was found');
  }

  return context;
};
