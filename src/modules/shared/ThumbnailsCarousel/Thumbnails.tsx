/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { useThumbnailsCarousel } from './ThumbnailsCarouselContext';

type ThumbnailProps = {
  onClick: () => void;
  isSelected: boolean;
  children: ReactNode;
};

type Thumbnail = (props: ThumbnailProps) => ReactNode;

type Props = ComponentPropsWithoutRef<'div'> & {
  Thumbnail: Thumbnail;
};

export const Thumbnails: FC<Props> = ({ Thumbnail, ...props }) => {
  const { carousel, slides } = useThumbnailsCarousel();
  const api = carousel[1];
  const [selectedThumb, setSelectedThumb] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setSelectedThumb(api.selectedScrollSnap());
    };

    api.on('init', onSelect).on('select', onSelect).on('reInit', onSelect);

    return () => {
      api.off('init', onSelect).off('select', onSelect).off('reInit', onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => {
    if (!api) {
      return;
    }

    api.scrollTo(index);
  };

  return (
    <div {...props}>
      {slides.map((slide, index) => (
        <Thumbnail
          key={index}
          isSelected={selectedThumb === index}
          onClick={() => scrollTo(index)}
        >
          {slide}
        </Thumbnail>
      ))}
    </div>
  );
};
