import './ProductsSlider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import React, { useCallback, useEffect, useState } from 'react';
import { CircleButton } from '../CircleButton';
import useEmblaCarousel from 'embla-carousel-react';
import { AlignmentOptionType } from 'embla-carousel/components/Alignment';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { useAppSelector } from '../../store/hooks';

type Props = {
  products: Product[];
  heading: string;
  showPrice?: boolean;
  slidesToScroll?: number;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  heading,
  showPrice = true,
}) => {
  const { loading, error } = useAppSelector(state => state.products);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const blankArray = [0, 1, 2, 3, 4];
  const inProgress = loading === 'pending' || error || products.length === 0;

  const options = {
    loop: false,
    slidesToScroll: 1,
    align: 'start' as AlignmentOptionType,
    dragFree: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const updateButtonsState = useCallback(() => {
    if (emblaApi) {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', updateButtonsState);
      emblaApi.reInit();
      updateButtonsState();
    }

    return () => {
      if (emblaApi) {
        emblaApi.off('select', updateButtonsState);
      }
    };
  }, [products, emblaApi, updateButtonsState]);

  return (
    <div className="products-slider">
      <div className="products-slider__top">
        <h2>{heading}</h2>

        <div className="products-slider__btns">
          <CircleButton
            type="arrow-left"
            onClick={scrollPrev}
            isDisabled={!canScrollPrev}
          />

          <CircleButton
            type="arrow-right"
            onClick={scrollNext}
            isDisabled={!canScrollNext}
          />
        </div>
      </div>
      <div className="products-slider__wrapper" ref={emblaRef}>
        <div className="products-slider__container">
          {(inProgress ? blankArray : products).map(item => (
            <div
              className="products-slider__slide"
              key={typeof item === 'number' ? item : item.itemId}
            >
              {inProgress || typeof item === 'number' ? (
                <ProductCardSkeleton />
              ) : (
                <ProductCard product={item as Product} showPrice={showPrice} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
