import React from 'react';
import { Link } from 'react-router-dom';
import { CartProduct } from '../../../../types';
import { ChangeQuantityButton } from '../../../../components/Buttons';
import {
  CloseIcon,
  MinusIcon,
  MinusDisabledIcon,
  PlusIcon,
} from '../../../../components/Icons';
import './CartItem.scss';
import '../../../../styles/_typography.scss';

type Props = {
  product: CartProduct;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemove: () => void;
};

export const CartItem: React.FC<Props> = ({
  product,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
}) => {
  const { name, itemId, image, quantity, price } = product;

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <button className="cart-item__icon-close" onClick={onRemove}>
          <CloseIcon />
        </button>
        <Link to={`/product/${itemId}`} className="cart-item__image-wrapper">
          <img className="cart-item__image" src={image} alt={name} />
        </Link>
        <Link
          to={`/product/${itemId}`}
          className="cart-item__title typography__body"
        >
          {name}
        </Link>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__counter">
          <ChangeQuantityButton
            onClick={onDecreaseQuantity}
            disabled={quantity === 1}
          >
            {quantity === 1 ? <MinusDisabledIcon /> : <MinusIcon />}
          </ChangeQuantityButton>
          <span className="cart-item__count typography__body">{quantity}</span>
          <ChangeQuantityButton onClick={onIncreaseQuantity}>
            <PlusIcon />
          </ChangeQuantityButton>
        </div>
        <h3 className="cart-item__price">${price * quantity}</h3>
      </div>
    </div>
  );
};
