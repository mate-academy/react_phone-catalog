import React, { useState } from 'react';
import { Product } from '../../type/Product';
import { ProductCard } from '../ProductCard';
import { HOT_PRICE_SLIDER } from '../../utils/const';
import { ICONS } from '../../icons';
import './ProductsSlider.scss';

type Props = {
  items: Product[],
  sliderTitle: string,
};

const ProductsSlider: React.FC<Props> = ({
  items,
  sliderTitle,
}) => {
  const [indexStart, setIndexImage] = useState(0);

  const {
    itemWidth,
    frameSize,
    step,
    animationDuration,
    infinity,
    gap,
  } = HOT_PRICE_SLIDER;

  const handleMoveRight = () => {
    const isEnoughImages
      = indexStart + step >= items.length - frameSize;

    if (isEnoughImages && !infinity) {
      setIndexImage(items.length - frameSize);
    } else if (isEnoughImages && infinity) {
      setIndexImage(0);
    } else {
      setIndexImage(indexStart + step);
    }
  };

  const handleMoveLeft = () => {
    const isEnoughImages = indexStart - 1 < 0;

    if (isEnoughImages && !infinity) {
      setIndexImage(0);
    } else if (isEnoughImages && infinity) {
      setIndexImage(items.length - frameSize);
    } else {
      setIndexImage(indexStart - step);
    }
  };

  const styleTransform = {
    transform: `translateX(-${indexStart * (itemWidth + gap)}px)`,
    transition: `${animationDuration}ms`,
    gap: `${gap}px`,
  };

  const prevDisabled = indexStart <= 0 && !infinity;
  const nextDisabled
    = indexStart > items.length - frameSize - step && !infinity;

  return (
    <>
      <div className="slider-section">
        <div className="slider-section__wrap">
          <h2 className="title title--h2">
            {sliderTitle}
          </h2>

          <div className="slider-section__change-direction">
            <button
              type="button"
              className="button button--direction button--hover"
              onClick={handleMoveLeft}
              disabled={prevDisabled}
            >
              <img
                src={ICONS.arrow}
                alt="move left"
                className="icon icon--left"
              />
            </button>

            <button
              type="button"
              className="button button--direction button--hover"
              disabled={nextDisabled}
              onClick={handleMoveRight}
            >
              <img
                src={ICONS.arrow}
                alt="move right"
                className="icon icon--right"
              />
            </button>
          </div>
        </div>

        <div
          className="slider-section__cards-container"
          data-cy="cardsContainer"
          style={{
            width: `${frameSize * itemWidth + (gap * (frameSize - 1))}px`,
          }}
        >
          <ul
            className="slider-section__list"
            style={styleTransform}
          >
            {items.map(product => (
              <li key={product.id}>
                <ProductCard key={product.id} product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>

    </>
  );
};

export default React.memo(ProductsSlider);
