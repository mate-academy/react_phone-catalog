import React, { memo, useCallback, useState } from 'react';
import { Product } from '../../../../definitions/types/Product';

import './ProductsCarousel.scss';
import ArrowButton from '../../../UI/buttons/ArrowButton';
import ProductCard from '../../ProductCard';
import { getRootCssVariable } from '../../../../utils/cssHelper';

export interface ProductsCarouselProps {
  name: string,
  products: Product[],
  loading?: boolean,
  step?: number,
  windowSize?: number,
  gapSize?: number
}

export const ProductsCarousel: React.FC<ProductsCarouselProps> = memo(({
  name,
  products,
  loading,
  step = 1,
  windowSize = 4,
  gapSize = 16,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const showedItems = loading ? Array.from({ length: 16 }, () => null) : products;

  const itemWidth = parseInt(getRootCssVariable('--product-card-width'));
  const lastIndex = showedItems.length - windowSize;
  const position = -((currentIndex * (itemWidth + gapSize)));

  const isFirst = currentIndex <= 0;
  const isLast = currentIndex > lastIndex;

  const slideToNext = useCallback(() => {
    setCurrentIndex(index => {
      const newIndex = index + step;

      return newIndex < lastIndex ? newIndex : lastIndex;
    });
  }, [lastIndex]);

  const slideToPrev = useCallback(() => {
    setCurrentIndex(index => {
      const newIndex = index - step;

      return newIndex >= 0 ? newIndex : 0;
    });
  }, []);

  return (
    <section className='products-carousel'>
      <div className='products-carousel__top'>
        <h3 className='products-carousel__name'>{name}</h3>

        <div className="products-carousel__controls">
          <ArrowButton
            disabled={isFirst}
            onClick={slideToPrev}
          />

          <ArrowButton
            disabled={isLast}
            rotate={180}
            onClick={slideToNext}
          />
        </div>
      </div>

      <div className='products-carousel__bottom'>
        <div
          className="products-carousel__content"
          style={{
            gap: `${gapSize}px`,
            transform: `translateX(${position}px)`,
            color: `red`,
          }}
        >
          {showedItems.map((product, index) => (
            <ProductCard product={product} key={product?.itemId ?? index} />
          ))}
        </div>
      </div>
    </section>
  );
});
