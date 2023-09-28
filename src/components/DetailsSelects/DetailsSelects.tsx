import React, { useContext, useState } from 'react';
import './DetailsSelects.scss';
import classNames from 'classnames';
import { CardParams } from '../../types/CardParams';
import { ProductFull } from '../../types/ProductFull';
import { ProductShort } from '../../types/ProductShort';
import { SelectCapacity } from '../SelectCapacity/SelectCapacity';
import { SelectColors } from '../SelectColors/SelectColors';
import { handlerChangeContext } from '../../helpers/handlerChangeContext';
import { LikeAndCartContext } from '../../helpers/LikeAndCartContext';
import { KeysOfStorage } from '../../types/KeysOfStorage';

type Props = {
  product: ProductFull,
  similarProducts: ProductShort[],
  numLiked: number,
  onSetNumLiked: (num: number) => void,
  numAdded: number,
  onSetNumAdded: (num: number) => void,
};

export const DetailsSelects: React.FC<Props> = ({
  product, similarProducts, numLiked, onSetNumLiked, numAdded, onSetNumAdded,
}) => {
  const {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    priceRegular,
    priceDiscount,
    color,
    id,
  } = product;

  const {
    liked,
    setLiked,
    addedToCart,
    setAddedToCart,
  } = useContext(LikeAndCartContext);
  const quantityInCart = addedToCart.filter(phoneId => phoneId === id).length;

  const [isLiked, setIsLiked] = useState<boolean>(liked.includes(id));
  const [isAdded, setIsAdded] = useState<boolean>(addedToCart.includes(id));
  const productShort = similarProducts.find(pr => pr.phoneId === product.id);

  const differentCapacitySameColor = similarProducts
    .filter(pr => pr.color === color)
    .sort((prA, prB) => {
      const capacityA = +(prA.capacity.slice(0, -2));
      const capacityB = +(prB.capacity.slice(0, -2));

      return capacityA - capacityB;
    });

  const differentColorSameCapacity = similarProducts
    .filter(pr => pr.capacity === capacity)
    .sort((prA, prB) => {
      return prA.color.localeCompare(prB.color);
    });

  const handlerClickLike = () => {
    handlerChangeContext(id, liked, setLiked, KeysOfStorage.Like);
    setIsLiked(!isLiked);

    if (isLiked) {
      onSetNumLiked(numLiked - 1);
    } else {
      onSetNumLiked(numLiked + 1);
    }
  };

  const handlerClickAddToCart = () => {
    handlerChangeContext(id, addedToCart, setAddedToCart, KeysOfStorage.Cart);
    setIsAdded(!isAdded);

    if (isAdded) {
      onSetNumAdded(numAdded - quantityInCart);
    } else {
      onSetNumAdded(numAdded + 1);
    }
  };

  return (
    <div className="details-selects">
      <div className="details-selects__list">
        <div className="details-selects__select">
          <SelectColors
            title="Available colors"
            similarProducts={differentColorSameCapacity}
          />
        </div>

        <div className="details-selects__select">
          <SelectCapacity
            title="Select capacity"
            similarProducts={differentCapacitySameColor}
          />
        </div>

        {priceDiscount !== priceRegular ? (
          <div className="details-selects__prices">
            <span className="details-selects__price-with-discount">
              {`$${priceDiscount}`}
            </span>

            <span className="details-selects__price">
              {`$${priceRegular}`}
            </span>
          </div>
        ) : (
          <div className="details-selects__prices">
            <span className="details-selects__price-with-discount">
              {`$${priceDiscount}`}
            </span>
          </div>
        )}

        <div className="selection-buttons">
          <button
            type="button"
            aria-label="button add"
            className={classNames(
              'selection-buttons__add',
              { 'is-selected': isAdded },
            )}
            onClick={handlerClickAddToCart}
          >
            {isAdded ? 'Added to card' : 'Add to sort'}
          </button>

          <button
            type="button"
            aria-label="button like"
            className={classNames(
              'selection-buttons__like',
              { 'is-selected': isLiked },
            )}
            onClick={handlerClickLike}
          />
        </div>

        <ul className="details-selects__params">
          <li className="details-selects__param">
            <span className="details-selects__param--name">
              {CardParams.Screen}
            </span>

            <span className="details-selects__param--value">
              {screen}
            </span>
          </li>

          <li className="details-selects__param">
            <span className="details-selects__param--name">
              {CardParams.Resolution}
            </span>

            <span className="details-selects__param--value">
              {resolution}
            </span>
          </li>

          <li className="details-selects__param">
            <span className="details-selects__param--name">
              {CardParams.Processor}
            </span>

            <span className="details-selects__param--value">
              {processor}
            </span>
          </li>

          <li className="details-selects__param">
            <span className="details-selects__param--name">
              {CardParams.Ram}
            </span>

            <span className="details-selects__param--value">
              {ram}
            </span>
          </li>
        </ul>
      </div>

      {productShort && (
        <div className="details-selects__id">
          {`ID: ${productShort.id}`}
        </div>
      )}
    </div>
  );
};
