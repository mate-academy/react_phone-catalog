import React from 'react';
import { useDispatch } from 'react-redux';
import { actions as goodsActions } from '../../store/cart';
import { ProductType } from '../../helpers/types';
import './CartProduct.scss';

export const CartProduct: React.FC<ProductType> = ({ product }) => {
  const {
    imageUrl,
    name,
    quantity,
    price,
    discount,
  } = product;

  const productPrice = discount === 0 ? price : price * (1 - discount / 100);
  const dispatch = useDispatch();

  const removeGoodFromCart = () => {
    dispatch(goodsActions.remove(product));
  };

  const increaseQuantityOfGood = () => {
    dispatch(goodsActions.increase(product));
  };

  const decreaseQuantityOfGood = () => {
    dispatch(goodsActions.decrease(product));
  };

  return (
    <div className="Product Cart-Product">
      <button
        type="button"
        className="Product-DeleteButton"
        onClick={removeGoodFromCart}
      >
        X
      </button>

      <img
        className="Product-Image"
        alt="product"
        src={imageUrl}
      />

      <h3
        className="Product-Title"
      >
        {name}
      </h3>

      <div className="Quantity-wrapper">
        <div className="Quantity Product-Quantity">
          <button
            type="button"
            className="Quantity-DecreaseButton Quantity-Button"
            onClick={decreaseQuantityOfGood}
            disabled={quantity <= 1}
          >
            -
          </button>

          <span className="Quantity-Value">
            {quantity}
          </span>

          <button
            type="button"
            className="Quantity-IncreaseButton Quantity-Button"
            onClick={increaseQuantityOfGood}
          >
            +
          </button>
        </div>

        <span className="Product-Price">
          {`$${productPrice}`}
        </span>
      </div>

    </div>
  );
};
