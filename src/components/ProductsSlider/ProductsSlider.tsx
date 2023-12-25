import React, { useState } from 'react';
import classNames from 'classnames';
import { ProductsList } from '../ProductsList/ProductsList';
import { UpgradedProduct } from '../../types/UpgradedProduct';
import './ProductsSlider.scss';
import { ICONS } from '../../images/icons/icons';

type Props = {
  title: string;
  products: UpgradedProduct[];
};

const CARD_WIDTH = 272;
const GAP_WIDTH = 16;
const BLOCK_WIDTH = CARD_WIDTH + GAP_WIDTH;

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [translate, setTranslate] = useState(0);
  const sliderWidth = BLOCK_WIDTH * products.length - BLOCK_WIDTH * 4;

  const stepRight = sliderWidth > translate + BLOCK_WIDTH * 4
    ? BLOCK_WIDTH * 4
    : sliderWidth - translate;

  const stepLeft = translate - BLOCK_WIDTH * 4 > 0
    ? BLOCK_WIDTH * 4
    : translate;

  const translateStyle = {
    transform: `translateX(-${translate}px)`,
  };

  const onLeftClick = () => {
    setTranslate(prevNum => prevNum - stepLeft);
  };

  const onRightClick = () => {
    setTranslate(prevNum => prevNum + stepRight);
  };

  const rightClickDisabled = stepRight === 0;
  const leftClickDisabled = stepLeft === 0;

  return (
    <div className="productsSlider">
      <div className="productsSlider__top">
        <h1 className="productsSlider__top--title">{title}</h1>
        <div className="productsSlider__top--buttons">
          <button
            type="button"
            className={classNames('smallButton productsSlider__top--button', {
              'smallButton--disabled': leftClickDisabled,
            })}
            onClick={onLeftClick}
            disabled={leftClickDisabled}
          >
            <img
              src={
                leftClickDisabled
                  ? ICONS.arrowLeftDisabled
                  : ICONS.arrowLeft
              }
              alt="Arrow left"
            />
          </button>
          <button
            type="button"
            className={classNames('smallButton productsSlider__top--button', {
              'smallButton--disabled': rightClickDisabled,
            })}
            onClick={onRightClick}
            disabled={rightClickDisabled}
          >
            <img
              src={
                rightClickDisabled
                  ? ICONS.arrowRightDisabled
                  : ICONS.arrowRight
              }
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
