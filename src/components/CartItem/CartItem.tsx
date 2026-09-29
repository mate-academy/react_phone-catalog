import React from 'react';
import { CartItem as CartItemType } from '../../types/product.types';
import { formatPrice } from '../../utils/format';
import { IconButton } from '../IconButton';
import './CartItem.scss';
import { publicPath } from '../../utils/publicPath';

interface Props {
  item: CartItemType;
  onRemove: (itemId: string) => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onRemove,
  onQuantityChange,
}) => {
  const { product, quantity } = item;

  return (
    <li className="cart-item">
      <IconButton
        icon="close"
        variant="plain"
        ariaLabel={`Remove ${product.name} from cart`}
        onClick={() => onRemove(product.itemId)}
      />

      <img
        src={publicPath(product.image)}
        alt={product.name}
        className="cart-item__image"
      />

      <p className="cart-item__name">{product.name}</p>

      <div className="cart-item__quantity">
        <IconButton
          icon="minus"
          ariaLabel="Decrease quantity"
          disabled={quantity <= 1}
          onClick={() => onQuantityChange(product.itemId, quantity - 1)}
        />
        <span className="cart-item__quantity-value">{quantity}</span>
        <IconButton
          icon="plus"
          ariaLabel="Increase quantity"
          onClick={() => onQuantityChange(product.itemId, quantity + 1)}
        />
      </div>

      <p className="cart-item__price">
        {formatPrice(product.price * quantity)}
      </p>
    </li>
  );
};
