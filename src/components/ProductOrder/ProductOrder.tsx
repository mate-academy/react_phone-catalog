import React from 'react';
import cn from 'classnames';
import { v4 as getId } from 'uuid';
import { productsColors } from '../../data/products-colors';

import { Button } from '../Button/Button';
import { usePhones } from '../../hooks/usePhones';

type Props = {
  id: string,
  availableColors: string[],
  availableCapacity: string[],
  selectParam: ({
    color,
    capacity,
  }: {
    color?: string,
    capacity?: string,
  }) => void,
  currentColor: string,
  currentCapacity: string,
  price: number,
  fullPrice: number,
  screen: string,
  processor: string,
  resolution: string,
  ram: string,
};

export const ProductOrder: React.FC<Props> = ({
  id,
  availableColors,
  availableCapacity,
  selectParam,
  currentColor,
  currentCapacity,
  price,
  fullPrice,
  screen,
  processor,
  resolution,
  ram,
}) => {
  const {
    favoritesId,
    cartProducts,
    handleOnCartAdd,
    handleOnLikeClick,
  } = usePhones();

  const isCartItem = cartProducts.find(product => product.id === id);

  return (
    <div className="product__order">
      <div className="product__order-container">
        <p className="product__order-title">
          Available colors
        </p>

        <div className="product__order-area">
          {availableColors.map((color: string) => (
            <Button
              key={getId()}
              className={cn(
                'button',
                'button__select-color',
                {
                  'button__select-color--active': (
                    color === currentColor
                  ),
                },
              )}
              onClick={() => selectParam({ color })}
            >
              <div
                className="button__select-color-round"
                style={{
                  backgroundColor: `${productsColors[color]}`,
                }}
              />
            </Button>
          ))}
        </div>
      </div>

      <div className="product__line" />

      <div className="product__order-container">
        <p className="product__order-title">
          Available colors
        </p>

        <div className="product__order-area">
          {availableCapacity.map((capacity: string) => (
            <Button
              key={getId()}
              className={cn(
                'button',
                'button__select',
                'button__select-capacity',
                {
                  'button__select-capacity--active': (
                    capacity === currentCapacity
                  ),
                },
              )}
              onClick={() => selectParam({ capacity })}
            >
              {capacity}
            </Button>
          ))}
        </div>
      </div>

      <div className="product__line" />

      <div className="product__price-wrapper">
        <h2 className="product__price price">
          {`$${price}`}
        </h2>
        <p className="product__full-price price-discount">
          {`$${fullPrice}`}
        </p>
      </div>

      <div className="product__order-btns">
        <Button
          className={cn(
            'button',
            'button__primary',
            'button--xl',
            {
              button__selected: isCartItem,
            },
          )}
          onClick={() => handleOnCartAdd(id)}
        >
          Add to cart
        </Button>

        <Button
          className="
            button
            button__like
            button__like--large
          "
          onClick={() => handleOnLikeClick(id)}
        >
          {
            favoritesId.includes(id)
              ? (<img src="img/icons/heart-active.svg" alt="Heart" />)
              : (<img src="img/icons/heart.svg" alt="Heart" />)
          }
        </Button>
      </div>

      <div className="product__order-specs">
        <div className="product__order-specs-wrapper">
          <p className="product__order-spec-name">
            Screen
          </p>
          <p className="product__order-spec-value">
            {screen}
          </p>
        </div>
        <div className="product__order-specs-wrapper">
          <p className="product__order-spec-name">
            Resolution
          </p>
          <p className="product__order-spec-value">
            {resolution}
          </p>
        </div>
        <div className="product__order-specs-wrapper">
          <p className="product__order-spec-name">
            Processor
          </p>
          <p className="product__order-spec-value">
            {processor}
          </p>
        </div>
        <div className="product__order-specs-wrapper">
          <p className="product__order-spec-name">
            RAM
          </p>
          <p className="product__order-spec-value">
            {ram}
          </p>
        </div>
      </div>
    </div>
  );
};
