import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './Banner.scss';

const BANNER_IMAGES = [
  { imgUrl: './_new/img/banner-phones.png', alt: 'Phones' },
  { imgUrl: './_new/img/banner-tablets.png', alt: 'Tablets' },
  { imgUrl: './_new/img/banner-accessories.png', alt: 'Accessories' },
];

export const Banner: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  );
  const autoplay = emblaApi?.plugins().autoplay;

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      autoplay?.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      autoplay?.reset();
    }
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      autoplay?.reset();
    }
  }, [emblaApi]);

  const onInit = useCallback((emblaAPI: EmblaCarouselType) => {
    setScrollSnaps(emblaAPI.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaAPI: EmblaCarouselType) => {
    setSelectedIndex(emblaAPI.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (emblaApi) {
      onInit(emblaApi);
      onSelect(emblaApi);
      emblaApi.on('select', onSelect);

      return () => {
        emblaApi.off('select', onSelect);
      };
    }

    return () => {};
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="Banner">
      <div className="Banner__content">
        <button
          type="button"
          aria-label="Previous"
          className="Banner__button Banner__button--prev"
          onClick={scrollPrev}
        />

        <div className="Banner__viewport" ref={emblaRef}>
          <div className="Banner__container">
            {BANNER_IMAGES.map(image => (
              <div className="Banner__slide" key={image.alt}>
                <img
                  className="Banner__slide-image"
                  src={image.imgUrl}
                  alt={image.alt}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Next"
          className="Banner__button Banner__button--next"
          onClick={scrollNext}
        />
      </div>

      <div className="Banner__pagination">
        {scrollSnaps.map((snap, index) => (
          <button
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            key={snap}
            className={cn('Banner__pagination-item', {
              'Banner__pagination-item--active': index === selectedIndex,
            })}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};
