import React from 'react';
import { ProductType } from '../../../types/ProductType';
import './CartItem.scss';

type Props = {
  product: ProductType;
  quantity: number;
  handleQuantity: (itemId: string, quantity: number) => void;
  handleRemove: (itemId: string) => void;
};

export const CartItem: React.FC<Props> = ({
  product,
  quantity,
  handleQuantity,
  handleRemove,
}) => {
  const handlePlus = () => {
    handleQuantity(product.itemId, quantity + 1);
  };

  const handleMinus = () => {
    if (quantity === 1) {
      return;
    }

    handleQuantity(product.itemId, quantity - 1);
  };

  const removeItem = () => {
    handleRemove(product.itemId);
  };

  return (
    <div className="cart__item">
      <div className="cart__item-group">
        <img
          src="icons/close_gray.svg"
          alt="Close icon"
          className="cart__item-close"
          onClick={removeItem}
        />

        <div className="cart__item-image-container square-container">
          <img
            src={product.image}
            alt="Product photo"
            className="cart__item-image"
          />
        </div>

        <p className="cart__item-name body-text slim-text">{product.name}</p>
      </div>

      <div className="cart__item-group">
        <div className="cart__item-quantity">
          <button
            className="cart__item-quantity-button button--white"
            onClick={handleMinus}
            aria-disabled={quantity === 1}
          >
            <img src="icons/minus.svg" alt="Minus icon" />
          </button>

          <p className="body-text">{quantity}</p>

          <button
            className="cart__item-quantity-button button--white"
            onClick={handlePlus}
          >
            <img src="icons/plus.svg" alt="Plus icon" />
          </button>
        </div>

        <h3 className="cart__item-price">${product.price}</h3>
      </div>
    </div>
  );
};
