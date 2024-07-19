import React, { useCallback, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductCarousel.scss';

type Props = {
  products: Product[] | [];
  title: string;
};

export const ProductCarousel: React.FC<Props> = ({ products, title }) => {
  const [position, setPosition] = useState(0);

  const maxPosition = Math.max(products.length - 1, 0);

  const nextButton = useCallback(() => {
    setPosition(prevPosition =>
      prevPosition + 1 > maxPosition ? 0 : prevPosition + 1,
    );
  }, [maxPosition]);

  const prevButton = useCallback(() => {
    setPosition(prevPosition =>
      prevPosition - 1 < 0 ? maxPosition : prevPosition - 1,
    );
  }, [maxPosition]);

  return (
    <div className="product-carousel">
      <div className="product-carousel__title-wrapper">
        <h2 className="title title--h2">{title}</h2>

        <div className="product-carousel__button-wrapper">
          <button
            type="button"
            aria-label="prevButton"
            onClick={prevButton}
            className="
              button
              product-carousel__button
              product-carousel__button--left
            "
            disabled={position === 0}
          />

          <button
            type="button"
            aria-label="nextButton"
            onClick={nextButton}
            className="
              button
              product-carousel__button
              product-carousel__button--right
            "
            disabled={position === maxPosition}
          />
        </div>
      </div>

      <div className="product-carousel__list-wrapper">
        <ul className="product-carousel__list">
          {products.map(product => (
            <li
              key={product.id}
              className="product-carousel__item"
              style={{
                transform: `translateX(calc(-${position * 100}% - ${position * 16}px))`,
              }}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
