import React, { useEffect } from 'react';
import { Product } from '../../type/Product';
import { ProductCard } from '../ProductCard';

import './Carousel.scss';

type Props = {
  products: Product[],
  currentSlide: number,
  id: string,
};

export const Carousel: React.FC<Props> = ({
  products,
  currentSlide,
  id,
}) => {
  const firstItem = document.querySelector('.carousel__item');
  const itemWidth = firstItem?.clientWidth || 0;

  useEffect(() => {
    const productsToMove = document.querySelectorAll(
      `.carousel__item--${id}`,
    );

    productsToMove.forEach((product) => {
      const element = product as HTMLElement;

      element.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
    });
  }, [currentSlide]);

  return (
    <ul className="carousel">
      {products.map((product) => {
        return (
          <li
            key={product.id}
            className={`
            carousel__item
            carousel__item--${id}`}
          >
            <ProductCard
              product={product}
            />
          </li>
        );
      })}
    </ul>
  );
};
