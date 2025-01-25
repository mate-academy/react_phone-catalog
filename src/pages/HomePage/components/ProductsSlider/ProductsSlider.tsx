import React, { useCallback, useEffect, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../../../components/ProductCard';
import useEmblaCarousel from 'embla-carousel-react';
import { Products } from '../../../../types/Products';
import { Icon } from '../../../../components/Icon';

type Props = {
  products: Products[];
  title: string;
  checkPrice?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  checkPrice,
}) => {
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

  return (
    <div className={styles.slider}>
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
