import { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import useEmblaCarousel from 'embla-carousel-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import s from './productSlider.module.scss';
import arrowLeft from '../../modules/Home/homePageImg/ArrowLeft.svg';
import arrowRight from '../../modules/Home/homePageImg/ArrowRight2.svg';
import { ProductCard } from '../productCard/productCard';
import { CardItem } from '../../types/СardItem';

interface ProductsSliderProps<T> {
  title: string;
  items: T[];
  mapItem: (src: T) => CardItem;
  loop?: boolean;
}
// eslint-disable-next-line max-len
export function ProductsSlider<T>({
  title,
  items,
  mapItem,
  loop = false,
}: ProductsSliderProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align: 'start',
    skipSnaps: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={s.embla}>
      <h2 className={s.embla__title}>{title}</h2>
      <div
        className={s.embla__viewport}
        ref={emblaRef}
        aria-roledescription="carousel"
      >
        <div className={s.embla__container}>
          {items.map((it, i) => (
            <div className={s.embla__slide} key={i}>
              <ProductCard item={mapItem(it)} />
            </div>
          ))}
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
          alt="ArrowLeft"
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
          alt="ArrowRight"
          aria-hidden="true"
          className={s.arrow__img}
        />
      </button>
    </div>
  );
}
