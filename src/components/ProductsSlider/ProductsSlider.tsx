import React, { useEffect, useRef, useState } from 'react';
import './ProductsSlider.scss';
import { Product } from '../../type/Product';
import { ProductCard } from '../ProductCard';

const CARD_GAP = 16;
const CARD_WIDTH = 272;

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  // #region calculation
  const [widthSlider, setWidthSlider] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const widthRef = useRef<HTMLDivElement>(null);

  function getAmountCardInStep() {
    const windowWidth = document.documentElement.offsetWidth;
    let width;

    if (windowWidth > 1200) {
      width = 4;
    } else if (windowWidth > 1000) {
      width = 3;
    } else if (windowWidth > 639) {
      width = 2;
    } else {
      width = 1;
    }

    return width;
  }

  const step = CARD_WIDTH + CARD_GAP;
  const amountCardInStep = getAmountCardInStep();
  const fullWidthSlider = (products.length - 1) * step + CARD_WIDTH;
  const fullStep = step * amountCardInStep;
  const usefulTranslate = fullWidthSlider - widthSlider;
  // #endregion

  useEffect(() => {
    if (widthRef.current) {
      setWidthSlider(widthRef.current.offsetWidth);
    }
  }, []);
  // #region Handler

  const handleClickNext = () => {
    if (translate > -usefulTranslate) {
      setTranslate(translate - fullStep);
    }

    if (translate - step <= -usefulTranslate) {
      setTranslate(-usefulTranslate);
      setIsDisable(true);
    }
  };

  const handleClickPrev = () => {
    setIsDisable(false);

    if (translate < 0) {
      setTranslate(translate + fullStep);
    }

    if (translate + fullStep >= 0) {
      setTranslate(0);
    }
  };
  // #endregion

  return (
    <div className="ProductsSlider Slider">
      <div className="Slider__header">
        <h2 className="Slider__header-name">{title}</h2>

        <div className="Buttons">
          <button
            type="button"
            className="Buttons__item"
            aria-label="previous"
            onClick={handleClickPrev}
            disabled={translate === 0}
          >
            <img
              src={
                translate === 0
                  ? 'icons/Arrow_left_disable.svg'
                  : 'icons/Arrow_Left_small.svg'
              }
              alt="previous"
              className="arrow-disabled"
            />
          </button>

          <button
            type="button"
            className="Buttons__item"
            aria-label="next"
            onClick={handleClickNext}
            disabled={isDisable}
          >
            <img
              src={
                isDisable
                  ? 'icons/Arrow_right_disable.svg'
                  : 'icons/Arrow_Right_small.svg'
              }
              alt="next"
            />
          </button>
        </div>
      </div>
      <div className="Slider__box" ref={widthRef}>
        <div
          className="Slider__content"
          style={{
            transform: `translateX(${translate}px)`,
            transition: '1s transform',
          }}
        >
          {products.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
