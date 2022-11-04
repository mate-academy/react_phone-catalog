import React, { useState, useRef } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './Carousel.scss';

type Props = {
  products: Product[];
  title: string;
};

export const Carousel: React.FC<Props> = ({ products, title }) => {
  const [carouselLeftPosition, setCarouselLeftPosition] = useState(0);
  const ul = useRef<HTMLUListElement>(null);
  const cardWidth = 272;
  const gap = 16;
  const carouselWidth = ul.current?.clientWidth;
  const visibleListWidth = 4 * (cardWidth + gap) - gap;

  const handlerLeftButtonClick = () => {
    setCarouselLeftPosition(prevPosition => prevPosition + (cardWidth + gap));
  };

  const handlerRightButtonClick = () => {
    setCarouselLeftPosition(prevPosition => prevPosition - (cardWidth + gap));
  };

  function stopCarousel() {
    if (!carouselWidth) {
      return false;
    }

    return (carouselWidth + carouselLeftPosition) <= visibleListWidth;
  }

  return (
    <div className="Carousel">
      <div className="Carousel__header">
        <h1>{title}</h1>
        <div className="Carousel__header-button-group">
          <button
            data-cy="leftButton"
            aria-label="leftButton"
            type="button"
            className="icon-button icon icon--arrow-left"
            disabled={carouselLeftPosition >= 0}
            onClick={handlerLeftButtonClick}
          />
          <button
            data-cy="rightButton"
            aria-label="rightButton"
            type="button"
            className="icon-button icon icon--arrow-right"
            disabled={stopCarousel()}
            onClick={handlerRightButtonClick}
          />
        </div>
      </div>
      <div className="Carousel__body-wrapper">
        <div
          className="Carousel__body-content"
          style={{ left: carouselLeftPosition }}
        >
          <ul
            ref={ul}
            className="Carousel__body-content-list"
          >
            {products.map(product => (
              <li
                key={product.id}
                className="Carousel__body-content-list-item"
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
