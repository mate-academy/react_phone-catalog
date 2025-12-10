import React, { useEffect, useRef, useState } from 'react';
import { ProductsSliderCard } from '../ProductsSliderCard/ProductsSliderCard';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  products: ProductDetails[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const chackScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      setCanScrollLeft(scrollLeft > 0);

      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const element = scrollRef.current;

    chackScroll();

    if (element) {
      element.addEventListener('scroll', chackScroll);
      window.addEventListener('scroll', chackScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', chackScroll);
      }

      window.removeEventListener('scroll', chackScroll);
    };
  }, [products]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="products-slider">
      <div className="products-slider__header">
        <h2 className="products-slider__title">{title}</h2>

        <div className="products-slider__arrows">
          <button
            className="products-slider__arrow products-slider__arrow-left"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          />
          <button
            className="products-slider__arrow products-slider__arrow-right"
            onClick={scrollRight}
            disabled={!canScrollRight}
          />
        </div>
      </div>

      <div className="products-slider__list" ref={scrollRef}>
        {products.map(product => (
          <ProductsSliderCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
