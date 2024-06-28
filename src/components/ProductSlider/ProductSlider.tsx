/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { UpgradedProduct } from '../../types/UpgradedProduct';
import { arrowLeftImg, arrowRightImg } from '../../utils/indes';

import './ProductSlider.scss';
import classNames from 'classnames';
import ItemForSlider from '../ItemForSlider/ItemForSlider';

type Props = {
  title: string;
  products: UpgradedProduct[];
};

const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [translate, setTranslate] = useState(0);
  const [cardWidth, setCardWidth] = useState(212);

  const CART_GAP = 16;
  const CART_BLOCK = cardWidth + CART_GAP;

  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setCardWidth(272);
      } else if (width >= 640) {
        setCardWidth(288);
      } else {
        setCardWidth(287);
      }
    };

    window.addEventListener('resize', updateCardWidth);
    updateCardWidth();

    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const sliderWidth = CART_BLOCK * products.length - CART_BLOCK * 1;

  const stepRight =
    sliderWidth > translate + CART_BLOCK * 1
      ? CART_BLOCK * 1
      : sliderWidth - translate;

  const stepLeft = translate - CART_BLOCK * 1 > 0 ? CART_BLOCK * 1 : translate;

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
    <div className="ProductSlider">
      <div className="ProductSlider__container">
        <div className="ProductSlider__top">
          <h2 className="ProductSlider__top-title">{title}</h2>
          <div className="ProductSlider__buttons">
            <button
              onClick={onLeftClick}
              disabled={leftClickDisabled}
              className={classNames('ProductSlider__buttons-button', {
                ['ProductSlider__buttons-button-isDisabled']: leftClickDisabled,
              })}
            >
              <img
                src={arrowLeftImg}
                alt="arrowLeft"
                className={classNames('ProductSlider__buttons-image', {
                  ['ProductSlider__buttons-image-isDisabled']:
                    leftClickDisabled,
                })}
              />
            </button>
            <button
              className={classNames('ProductSlider__buttons-button', {
                ['ProductSlider__buttons-button-isDisabled']:
                  rightClickDisabled,
              })}
              onClick={onRightClick}
            >
              <img
                src={arrowRightImg}
                alt="arrowRight"
                className={classNames('ProductSlider__buttons-image', {
                  ['ProductSlider__buttons-image-isDisabled']:
                    rightClickDisabled,
                })}
              />
            </button>
          </div>
        </div>

        <div className="ProductSlider__contant">
          {products.map(product => (
            <div
              key={product.id}
              style={translateStyle}
              className="ProductSlider__contant-wrap"
            >
              <ItemForSlider product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
