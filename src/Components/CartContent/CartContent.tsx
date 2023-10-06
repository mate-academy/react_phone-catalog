import React from 'react';
import classNames from 'classnames';
import { Phone } from '../../Type/Phone';
import { useAppDispatch } from '../../app/hooks';
import {
  addAmountCart,
  removeAmountCart,
  removeCart,
} from '../../features/cartSlice';
import { BASE_URL } from '../../utils/BASE_URL';

import './cartContent.scss';

type Props = {
  product: Phone;
};

export const CartContent: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="products"
      key={product.itemId}
    >
      <div className="product products--content">
        <button
          type="button"
          aria-label="Mute volume"
          className="product__buttons product__buttons--close"
          onClick={() => dispatch(removeCart(product))}
        />

        <img
          src={`${BASE_URL}/_new/${product.image}`}
          alt="product"
          className="product--img"
        />

        <p className="product--name">{product.name}</p>

        <div className="product--buttons">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'product__buttons--minus product__buttons product--button',
              { 'product__buttons--minusActive': product.amount !== 1 },
            )}
            onClick={() => dispatch(removeAmountCart(product))}
            disabled={product.amount === 1}
          />
          {product.amount}
          <button
            type="button"
            aria-label="Mute volume"
            className="product__buttons--plus product__buttons product--button"
            onClick={() => dispatch(addAmountCart(product))}
          />
        </div>

        <div>
          <h2 className="product--price">{`$${product.fullPrice}`}</h2>
        </div>
      </div>
    </div>
  );
};
