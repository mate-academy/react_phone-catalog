import React, { useCallback, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCart } from '../ProductCart';
import './ProductsSlider.scss';

type Props = {
  title: string,
  products: Product[],
};

const CARD_WIDTH = 272;
const STEP = 1;
const FRAME_SIZE = 4;
const GAP = 16;
const ANIMATION_DURATION = 1000;

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [firstProduct, setFirstProduct] = useState(0);

  const translateValue = (CARD_WIDTH + GAP) * firstProduct;
  const lastVisible = products.length - 1;
  const sliderWidth = (CARD_WIDTH * FRAME_SIZE) + (GAP * (FRAME_SIZE - 1));

  const scrollForward = useCallback(() => {
    setFirstProduct(firstProduct === lastVisible
      ? 0
      : currentProd => currentProd + STEP);
  }, [firstProduct, lastVisible]);

  const scrollBack = useCallback(() => {
    const nextProduct = firstProduct - STEP;

    setFirstProduct(nextProduct < 0
      ? 0
      : nextProduct);
  }, [firstProduct]);

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__title-and-buttons">
        <h2 className="ProductsSlider__title">
          {title}
        </h2>
        <div className="ProductsSlider__buttons">
          <button
            type="button"
            aria-label="Previous products"
            className="button button--prev"
            disabled={firstProduct === 0}
            onClick={scrollBack}
          />
          <button
            type="button"
            aria-label="Next products"
            className="button button--next"
            onClick={scrollForward}
          />
        </div>
      </div>
      <div
        className="ProductsSlider__cards-container"
        data-cy="cardsContainer"
      >
        {products.map(product => (
          <div
            key={product.id}
            style={{
              width: sliderWidth,
              transform: `translateX(-${translateValue}px)`,
              transition: `transform ${ANIMATION_DURATION}ms ease`,
            }}
          >
            <ProductCart
              newProduct={product}
              sliderCard="isSliderCard"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
