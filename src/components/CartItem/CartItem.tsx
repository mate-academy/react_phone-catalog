import React from 'react';
import { Product } from '../../types/Product';
import './CartItem.scss';
import { CartItemType, useCart } from '../../contexts/Cart';
import { ProductDetails } from '../ProductDetails';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
  cartItem: CartItemType;
}

export const CartItem: React.FC<Props> = ({ product, cartItem }) => {
  const { increaseQuantity, decreaseQuantity, toggleCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item__close" onClick={() => toggleCart(cartItem.id)}>
        <img src="./img/close.svg" alt="close" />
      </div>

      <Link to={`/product/${product.id}`} className="cart-item__img">
        <img src={product.images[0]} alt={product.name} />
      </Link>

      <Link to={`/product/${product.id}`} className="cart-item__title">
        {product.name}
      </Link>

      <div className="cart-item__counter">
        <button onClick={() => decreaseQuantity(cartItem.id)}>
          <img src="./img/minus.svg" alt="minus" />
        </button>
        <p>{cartItem.quantity}</p>
        <button onClick={() => increaseQuantity(cartItem.id)}>
          <img src="./img/plus.svg" alt="plus" />
        </button>
      </div>

      <p className="cart-item__price">${product.priceDiscount * cartItem.quantity}</p>
    </div>
  );
};
