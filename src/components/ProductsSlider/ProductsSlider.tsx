import React, { useState } from 'react';
import './ProductsSlider.scss';
import cn from 'classnames';
import { UpgratedProduct } from '../../types/UpgratedProduct';
import { ICONS } from '../../images/icons/Icons';
import { ProductsList } from '../ProductsList/ProductsList';

type Props = {
  products: UpgratedProduct[];
  title: string;
};

const CARD_WIDTH = 272;
const CARD_GAP = 16;
const CARD_BLOCK = CARD_WIDTH + CARD_GAP;
const SLIDE = window.innerWidth >= 1200 ? 4 : 2;

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [translate, setTranslate] = useState(0);
  const sliderWidth = CARD_BLOCK * products.length - CARD_BLOCK * SLIDE;

  const stepRight =
    sliderWidth > translate + CARD_BLOCK * SLIDE
      ? CARD_BLOCK * SLIDE
      : sliderWidth - translate;

  const stepLeft =
    translate - CARD_BLOCK * SLIDE > 0 ? CARD_BLOCK * SLIDE : translate;

  const translateStyle = {
    transform: `translateX(-${translate}px)`,
  };

  const onLeftClick = () => {
    setTranslate(prev => prev - stepLeft);
  };

  const onRightClick = () => {
    setTranslate(prev => prev + stepRight);
  };

  const rightDisabled = stepRight === 0;
  const leftDisabled = stepLeft === 0;

  return (
    <div className="productsSlider">
      <div className="productsSlider__top">
        <h1 className="productsSlider__top--title">{title}</h1>

        <div className="productsSlider__top--buttons">
          <button
            type="button"
            className={cn('smallButton productsSlider__top--buttons', {
              'smallButton--disabled': leftDisabled,
            })}
            onClick={onLeftClick}
            disabled={leftDisabled}
          >
            <img
              src={leftDisabled ? ICONS.arrowLeftDisabled : ICONS.arrowLeft}
              alt="Arrow left"
            />
          </button>

          <button
            type="button"
            className={cn('smallButton productsSlider__top--buttons', {
              'smallButton--disabled': rightDisabled,
            })}
            onClick={onRightClick}
            disabled={rightDisabled}
          >
            <img
              src={rightDisabled ? ICONS.arrowRightDisabled : ICONS.arrowRight}
              alt="Arrow right"
            />
          </button>
        </div>
      </div>

      <div className="productsSlider__content" style={translateStyle}>
        <ProductsList products={products} />
      </div>
    </div>
  );
};
