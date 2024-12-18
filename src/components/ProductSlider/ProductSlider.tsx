import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';
import { ProductType } from '../../types/ProductType';

const getStyles = (element: HTMLDivElement | Element) => {
  const styles = getComputedStyle(element);

  return {
    width: parseFloat(styles.width),
    gap: parseFloat(styles.gap),
  };
};

type Props = {
  products: ProductType[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) => {
    if (!containerRef.current) {
      return;
    }

    const childrenCount = containerRef.current.children.length;
    const newScrollIndex = Math.max(
      0,
      Math.min(scrollIndex + amount, childrenCount - visibleItemsCount),
    );

    setScrollIndex(newScrollIndex);
  };

  const scrollRight = () => scroll(visibleItemsCount);
  const scrollLeft = () => scroll(-visibleItemsCount);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.style.transform = `translateX(-${scrollIndex * scrollWidth}px)`;
  }, [scrollIndex]);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const product = containerRef.current.children[0];

    if (!product) {
      return;
    }

    const containerStyles = getStyles(containerRef.current);
    const productCardStyles = getStyles(product);

    setScrollWidth(productCardStyles.width + containerStyles.gap);
    setVisibleItemsCount(
      Math.floor(containerStyles.width / productCardStyles.width),
    );
  });

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h2 className="product-slider__title">{title}</h2>
        <div className="product-slider__buttons">
          <div
            className="button--arrow"
            onClick={scrollLeft}
            aria-disabled={scrollIndex <= 0}
          >
            <img src="/icons/arrow_left.svg" alt="Arrow left" />
          </div>

          <div
            className="button--arrow"
            onClick={scrollRight}
            aria-disabled={
              !!containerRef.current &&
              scrollIndex + visibleItemsCount >=
                containerRef.current.children.length
            }
          >
            <img src="/icons/arrow_right.svg" alt="Arrow right" />
          </div>
        </div>
      </div>
      <div className="product-slider__container" ref={containerRef}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
