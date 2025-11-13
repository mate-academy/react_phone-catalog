import React, { useContext, useEffect, useRef } from 'react';
import './SliderProductList.scss';
import type { Product } from '../../../../shared/types/Product';
import { SliderContext } from '../../../../shared/context/SliderContext';
import { CardItem } from '../../../../shared/components/CardItem';

type SliderProductListProps = {
  productList: Product[];
};

export const SliderProductList: React.FC<SliderProductListProps> = ({
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
        <CardItem product={product} key={product.id} />
      ))}
    </div>
  );
};
