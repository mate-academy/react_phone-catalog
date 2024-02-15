import React, {
  memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { Product } from '../../../../definitions/types/Product';

import './ProductsCarousel.scss';
import ArrowButton from '../../../UI/buttons/ArrowButton';
import ProductCard from '../../ProductCard';
import { getRootCssVariable } from '../../../../utils/cssHelper';
import { isFirst, isLast } from '../../../../utils/servicesHelper';

export interface ProductsCarouselProps {
  name: string,
  products: Product[],
  loading?: boolean,
  step?: number,
  gapSize?: number
}

export const ProductsCarousel: React.FC<ProductsCarouselProps> = memo(({
  name,
  products,
  loading,
  gapSize = 16,
  step = 1,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [disable, setDisable] = useState({ isLast: false, isFirst: true });
  const cardWidth = parseInt(getRootCssVariable('--product-card-width'), 10);
  const showedItems = loading ? Array.from({ length: 16 }, () => null) : products;
  const contentElement = contentRef.current;

  useEffect(() => {
    const handleScroll = () => {
      if (contentElement) {
        setDisable(disable => {
          const newIsLast = isLast(contentElement);
          const newIsFirst = isFirst(contentElement);

          if (disable.isFirst !== newIsFirst || disable.isLast !== newIsLast) {
            return { isFirst: newIsFirst, isLast: newIsLast };
          }

          return disable;
        });
      }
    };

    contentElement?.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => contentElement?.removeEventListener('scroll', handleScroll);
  }, [contentElement]);

  const scrollByStep = useCallback((step: number) => {
    if (contentElement) {
      const scrollAmount = (cardWidth + gapSize) * step;

      contentElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, [cardWidth, gapSize, contentElement]);

  const scrollStepDeps = [scrollByStep, step];
  const scrollNext = useCallback(() => scrollByStep(step), scrollStepDeps);
  const scrollPrev = useCallback(() => scrollByStep(-step), scrollStepDeps);

  return (
    <section className="products-carousel">
      <div className="products-carousel__top">
        <h3 className="products-carousel__name">{name}</h3>
        <div className="products-carousel__controls">
          <ArrowButton onClick={scrollPrev} disabled={disable.isFirst} />
          <ArrowButton rotate={180} onClick={scrollNext} disabled={disable.isLast} />
        </div>
      </div>

      <div className="products-carousel__bottom">
        <div
          ref={contentRef}
          style={{ gap: `${gapSize}px` }}
          className="products-carousel__content"
        >
          {showedItems.map((product, index) => (
            <ProductCard
              product={product}
              key={product?.itemId ?? index}
              className="products-carousel__item"
            />
          ))}
        </div>
      </div>
    </section>
  );
});
