import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';

type Props = {
  title: string;
};

const getStyles = (element: HTMLDivElement | Element) => {
  const styles = getComputedStyle(element);
  return {
    width: parseFloat(styles.width),
    gap: parseFloat(styles.gap),
  };
};

const calculateScrollWidth = (
  containerRef: React.RefObject<HTMLDivElement>,
) => {
  if (!containerRef.current) {
    return 0;
  }

  const product = containerRef.current.children[0];

  if (!product) {
    return 0;
  }

  const containerStyles = getStyles(containerRef.current);
  const productCardStyles = getStyles(product);

  return productCardStyles.width + containerStyles.gap;
};

const useRefDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const { width, height } = ref.current.getBoundingClientRect();
    setDimensions({ width: Math.round(width), height: Math.round(height) });
  }, [ref]);

  return dimensions;
};

export const ProductSlider: React.FC<Props> = ({ title }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const dimensions = useRefDimensions(containerRef);

  const visibleItemsCount = useMemo(() => {
    if (!containerRef.current) {
      return 0;
    }

    const product = containerRef.current.children[0];

    if (!product) {
      return 0;
    }

    const { width: containerWidth } = getStyles(containerRef.current);
    const { width: productCardWidth } = getStyles(product as HTMLElement);

    return Math.floor(containerWidth / productCardWidth);
  }, [dimensions]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const scrollWidth = calculateScrollWidth(containerRef);
    containerRef.current.style.transform = `translateX(-${scrollIndex * scrollWidth}px)`;
  }, [scrollIndex]);

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
        {[...Array(7)].map((_, index) => (
          <ProductCard key={index} oldPrice={1299} />
        ))}
      </div>
    </div>
  );
};
