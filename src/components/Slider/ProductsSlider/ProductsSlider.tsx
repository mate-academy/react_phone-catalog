import React, { useEffect, useRef, useState } from 'react';

import { ProductCard } from '../../ProductCard';
import { Navigation } from '../Navigation';
import { SkeletonProduct } from '../../Skeletons/SkeletonProduct';
import { ErrorMessage } from '../../ErrorMessage';

import { Product } from '../../../types/Product';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  isLoading?: boolean;
  isError: boolean;
  notVisibleFullPrice?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  isLoading,
  isError,
  notVisibleFullPrice,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;

    if (!track || !card) {
      return;
    }

    const gap = parseFloat(getComputedStyle(track).columnGap);

    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    setIsStart(track.scrollLeft <= 0);
    setIsEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
  };

  const handlePrev = () => scrollByCard(-1);

  const handleNext = () => scrollByCard(1);

  const renderProducts = () => {
    if (isLoading) {
      return Array.from({ length: 4 }, (_, index) => (
        <SkeletonProduct key={index} />
      ));
    }

    return products.map(product => (
      <ProductCard
        key={product.itemId}
        product={product}
        notVisibleFullPrice={notVisibleFullPrice}
      />
    ));
  };

  useEffect(() => {
    handleScroll();
  }, [products]);

  return (
    <section className={styles['products-slider']}>
      <div className={styles['products-slider__header']}>
        <h2 className={styles['products-slider__title']}>{title}</h2>

        <Navigation
          disabledPrev={isStart}
          disabledNext={isEnd}
          onClickPrev={handlePrev}
          onClickNext={handleNext}
        />
      </div>

      <div
        className={styles['products-slider__body']}
        ref={trackRef}
        onScroll={handleScroll}
      >
        {renderProducts()}
      </div>

      {isError && <ErrorMessage message="Something went wrong" />}
    </section>
  );
};
