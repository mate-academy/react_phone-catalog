import React, { useContext, useEffect, useRef } from 'react';
import './ProductCarousel.scss';
import type { Product } from '../../../../types/Product';
import { SliderContext } from '../../../../context/SliderContext';
import { ProductCard } from '../../../ui/ProductCard';

type ProductCarouselProps = {
  productList: Product[];
};

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  productList,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentSlideIndex } = useContext(SliderContext);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const card = containerRef.current.children[currentSlideIndex] as
      | HTMLElement
      | undefined;

    if (!card) {
      return;
    }

    containerRef.current.scrollTo({
      left: card.offsetLeft,
      behavior: 'smooth',
    });
  }, [currentSlideIndex]);

  return (
    <div className="slider-product-list" ref={containerRef}>
      {productList.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
