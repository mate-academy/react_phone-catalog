/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  title: string;
};

const CARD_WIDTH = 272;
const GAP = 16;

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const CARDS_QNT = products.length;
  const GAPS_QNT = products.length - 1;

  const PRODUCT_CARD_CONTAINER_WIDTH = CARDS_QNT * CARD_WIDTH + GAPS_QNT * GAP;

  const [slideIndex, setSlideIndex] = useState(0);

  const slideCards = (slideTo: string) => {
    const endPosition = CARDS_QNT - 4;

    if (slideTo === 'next') {
      setSlideIndex(slideIndex !== endPosition
        ? slideIndex + 1
        : 0);
    } else if (slideTo === 'prev') {
      setSlideIndex(slideIndex !== 0
        ? slideIndex - 1
        : endPosition);
    }
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__top">
        <h1 className="ProductsSlider__title">
          {title}
        </h1>

        <div className="ProductsSlider__buttons">
          <button
            type="button"
            className="ProductsSlider__button ProductsSlider__button--prev"
            onClick={() => slideCards('prev')}
            disabled={slideIndex === 0}
          />

          <button
            type="button"
            className="ProductsSlider__button ProductsSlider__button--next"
            onClick={() => slideCards('next')}
            disabled={slideIndex === CARDS_QNT - 4}
          />
        </div>
      </div>

      <ul
        className="ProductsSlider__container"
        style={{
          width: PRODUCT_CARD_CONTAINER_WIDTH,
          transform: `translateX(-${slideIndex * 288}px)`,
        }}
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
