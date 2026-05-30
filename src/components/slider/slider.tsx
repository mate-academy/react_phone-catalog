import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import useEmblaCarousel from 'embla-carousel-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import s from './slider.module.scss';
import arrowLeft from '../../modules/Home/homePageImg/ArrowLeft.svg';
// eslint-disable-next-line max-len
import arrowRight from '../../modules/Home/homePageImg/Arrow Right.svg';

interface SliderProps {
  images: React.ReactNode[];
  loop?: boolean;
}

export const Slider: React.FC<SliderProps> = ({ images, loop = false }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align: 'start',
    skipSnaps: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const id = setInterval(() => {
      if (direction === 'forward') {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          setDirection('backward');
          emblaApi.scrollPrev();
        }
      } else {
        if (emblaApi.canScrollPrev()) {
          emblaApi.scrollPrev();
        } else {
          setDirection('forward');
          emblaApi.scrollNext();
        }
      }
    }, 3000);

    return () => clearInterval(id);
  }, [emblaApi, direction]);

  return (
    <div className={s.embla}>
      <div
        className={s.embla__viewport}
        ref={emblaRef}
        aria-roledescription="carousel"
      >
        <div className={s.embla__container}>
          {images.map((node, i) => {
            let content: React.ReactNode;

            if (typeof node === 'string') {
              content = (
                <img
                  className={s.embla__img}
                  src={node}
                  alt={`Slide ${i + 1}`}
                />
              );
            } else if (React.isValidElement(node)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const el = node as React.ReactElement<any>;
              const prevClass = (el.props as { className?: string }).className;

              content = React.cloneElement(el, {
                className: clsx(prevClass, s.embla__img),
              });
            } else {
              content = node;
            }

            return (
              <div className={s.embla__slide} key={i}>
                {content}
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={`${s.arrow} ${s['arrow--left']}`}
        onClick={prev}
        aria-label="Previous slide"
        disabled={!loop && !canPrev}
      >
        <img
          src={arrowLeft}
          alt=""
          aria-hidden="true"
          className={s.arrow__img}
        />
      </button>

      <button
        type="button"
        className={`${s.arrow} ${s['arrow--right']}`}
        onClick={next}
        aria-label="Next slide"
        disabled={!loop && !canNext}
      >
        <img
          src={arrowRight}
          alt=""
          aria-hidden="true"
          className={s.arrow__img}
        />
      </button>

      <div className={s.embla__dots}>
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            className={clsx(
              s.embla__dot,
              i === selectedIndex && s['is-selected'],
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
