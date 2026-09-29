import React from 'react';
import { useCart } from '@/shared/context/CartContext';
import { Link } from 'react-router-dom';
import { CartItem } from '@/shared/types';
import {
  DeleteIcon,
  MathDecreaseIcon,
  MathIncreaseIcon,
} from '@/shared/assets/icons';
import { IconButton } from '@/shared/components/Buttons/components/IconButton';
import { ProductPrice } from '@/shared/components/ProductPrice';

import cn from 'classnames';
import './CartProduct.scss';

type Props = {
  item: CartItem;
  className?: string;
};
export const CartProduct: React.FC<Props> = ({ item, className }) => {
  const { removeFromCart, changeQuantity } = useCart();
  const isMinQuantity = item.quantity <= 1;

  return (
    <article className={`cart-product ${className}`.trim()}>
      <div className="cart-product__info-wrapper">
        {/* 1. delete btn */}
        <button
          type="button"
          className="cart-product__remove-btn"
          aria-label="Remove item"
          onClick={() => removeFromCart(item.id)}
        >
          <DeleteIcon className="cart-product__remove-icon" />
        </button>
        {/* 2. preview Link */}
        <Link
          to={`/${item.product.category}/${item.product.itemId}`}
          className="cart-product__image-link"
        >
          <img
            src={`${import.meta.env.BASE_URL}${item.product.image}`}
            alt={item.product.name}
            className="cart-product__image"
          />
        </Link>
        {/* 3. title Link */}
        <Link
          to={`/${item.product.category}/${item.product.itemId}`}
          className="cart-product__title"
        >
          {item.product.name}
        </Link>
      </div>

      <div className="cart-product__action-wrapper">
        {/* 4. controls quantity change */}
        <div className="cart-product__quantity-controls">
          <IconButton
            className={cn('cart-product__quantity-btn', {
              'cart-product__quantity-btn--disabled': isMinQuantity,
            })}
            aria-label="Decrease quantity"
            disabled={isMinQuantity}
            onClick={() => changeQuantity(item.id, -1)}
          >
            <MathDecreaseIcon className="cart-product__btn-icon" />
          </IconButton>

          <span className="cart-product__quantity-value">{item.quantity}</span>

          <IconButton
            className="cart-product__quantity-btn"
            aria-label="Increase quantity"
            onClick={() => changeQuantity(item.id, 1)}
          >
            <MathIncreaseIcon className="cart-product__btn-icon" />
          </IconButton>
        </div>
        {/* 5. Price pro item */}
        <ProductPrice
          className="cart-product__price"
          price={item.product.price}
        />
      </div>
    </article>
  );
};
