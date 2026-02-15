import React, { useCallback, useEffect, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../../../components/ProductCard';
import useEmblaCarousel from 'embla-carousel-react';
import { Product } from '../../../../types/Product';
import { Icon } from '../../../../components/Icon';
import { Loader } from '../../../../components/Loader';

type Props = {
  products: Product[];
  title: string;
  checkPrice?: boolean;
};
export const ProductsSlider = ({ products, title, checkPrice }: Props) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    slidesToScroll: 1,
  });

  useEffect(() => {
    if (emblaApi) {
      const updateButtonsState = () => {
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
      };

      emblaApi.on('select', updateButtonsState);
      updateButtonsState();

      return () => {
        emblaApi.off('select', updateButtonsState);
      };
    }
  }, [emblaApi, products]);

  const goToPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const goToNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  if (products.length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.slider}>
      <div className={styles.slider__top}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__btns}>
          <button
            className={styles.slider__btn}
            onClick={goToPrev}
            disabled={!canScrollPrev}
          >
            <Icon type="arrowPrev" />
          </button>

          <button
            className={styles.slider__btn}
            onClick={goToNext}
            disabled={!canScrollNext}
          >
            <Icon type="arrowNext" />
          </button>
        </div>
      </div>
      <div className={styles.slider__wrapper} ref={emblaRef}>
        <div className={styles.slider__products}>
          {products.map(product => (
            <ProductCard
              path={`/${product.category}/${product.itemId}`}
              product={product}
              key={product.id}
              checkPrice={checkPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
