import React, { useContext, useEffect, useRef } from 'react';
import './ProductList.scss';
import type { Product } from '../../../../shared/types/Product';
import { SliderContext } from '../../../../shared/context/SliderContext';
import { CardItem } from '../../../../shared/components/CardItem';

type ProductListProps = {
  productList: Product[];
};

export const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCurrentSlideIndex, currentSlideIndex } = useContext(SliderContext);

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

  const onRelease = () => {
    if (!containerRef.current) {
      return;
    }

    let closestIndex = 0;
    let minDiff = Infinity;

    const container = containerRef.current;
    const centerOfContainer = container.scrollLeft + container.offsetWidth / 2;
    const imageList = Array.from(container.children) as HTMLElement[];

    imageList.forEach((image, index) => {
      const imageCenter = image.offsetLeft + image.offsetWidth / 2;
      const diff = Math.abs(imageCenter - centerOfContainer);

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    setCurrentSlideIndex(closestIndex);
  };

  return (
    <div
      className="product-list"
      onMouseUp={onRelease}
      onTouchEnd={onRelease}
      ref={containerRef}
    >
      {productList.map(product => (
        <CardItem product={product} cardSize={'small'} key={product.id} />
      ))}
    </div>
  );
};
