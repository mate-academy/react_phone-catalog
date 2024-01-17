import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import './ProductSlider.scss';
import { ICONS } from '../../icons';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  title: string;
  products: Product[];
};

const CARD_WIDTH = 272;
const GRID_SIZE = 4;
const STEP = 4;
const GAP = 16;
const ANIMATION_DURATION = 1500;

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(false);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastVisible = products.length - 1;
  const translateValue = (CARD_WIDTH + GAP) * currentIndex;
  const sliderWidth = (CARD_WIDTH * GRID_SIZE) + (GAP * (GRID_SIZE - 1));

  const handleNext = useCallback(() => {
    setCurrentIndex(
      currentIndex === lastVisible
        ? 0
        : (currentProduct) => currentProduct + STEP,
    );
  }, [currentIndex, lastVisible]);

  const handlePrev = useCallback(() => {
    const nextProduct = currentIndex - STEP;

    setCurrentIndex(nextProduct < 0 ? 0 : nextProduct);
  }, [currentIndex]);

  useEffect(() => {
    setLeftButtonDisabled(currentIndex === 0);

    const remainingProducts = products.length - (currentIndex + 4);

    setRightButtonDisabled(remainingProducts <= 0);
  }, [currentIndex, products.length]);

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h1 className="product-slider__top-title">{title}</h1>
        <div className="product-slider__top-buttons">
          <button
            // eslint-disable-next-line max-len
            className="product-slider__top-button product-slider__top-button--left"
            type="button"
            onClick={handlePrev}
            disabled={leftButtonDisabled}
          >
            {leftButtonDisabled ? (
              <img
                src={ICONS.arrowDisabledLeft}
                alt="Can't scroll to the left"
              />
            ) : (
              <img src={ICONS.arrowLeft} alt="button left" />
            )}
          </button>

          <button
            // eslint-disable-next-line max-len
            className="product-slider__top-button product-slider__top-button--right"
            type="button"
            onClick={handleNext}
            disabled={rightButtonDisabled}
          >
            {rightButtonDisabled ? (
              <img
                src={ICONS.arrowDisabledRight}
                alt="Can't scroll to the right"
              />
            ) : (
              <img src={ICONS.arrowRight} alt="button right" />
            )}
          </button>
        </div>
      </div>

      <div className="product-slider__content" data-cy="cardsContainer">
        <ul className="product-slider__content-list">
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                width: sliderWidth,
                transform: `translateX(-${translateValue}px)`,
                transition: `transform ${ANIMATION_DURATION}ms ease`,
              }}
              className="product-slider__content-list--item"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
