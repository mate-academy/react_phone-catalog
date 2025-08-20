import React from 'react';
import { Product } from '../../utils/Product';
import { ButtonScroll } from '../ButtonScroll';
import './CartItem.scss';
import { useCart } from '../../context/CartContext/CartContext';

type Props = {
  product: Product;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const getImageSrc = (src: string) => (src.startsWith('/') ? src : '/' + src);

  const { removeFromCart, changeQuantity } = useCart();

  return (
    <div className="cart">
      <button
        onClick={() => removeFromCart(product.id)}
        className="cart__close"
      >
        <img src="/img/icons/close-dark.svg" alt="close button" />
      </button>

      <div className="cart__image-wrapper">
        <img
          className="cart__image"
          src={getImageSrc(product.images[0])}
          alt="product image"
        />
      </div>

      <p className="cart__name">{product.name}</p>

      <div className="arrow">
        <ButtonScroll
          buttonText="/img/icons/minus.svg"
          clickFunc={() => changeQuantity(product.id, -1)}
        />

        <p>{quantity}</p>

        <ButtonScroll
          buttonText="/img/icons/plus.svg"
          clickFunc={() => changeQuantity(product.id, 1)}
        />
      </div>

      <p className="cart__price">${product.priceDiscount}</p>
    </div>
  );
};
