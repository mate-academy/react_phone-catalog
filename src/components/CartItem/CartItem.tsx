import React from 'react';
import { Product } from '../../utils/Product';
import { ButtonScroll } from '../ButtonScroll/ButtonScroll';
import { useCart } from '../../context/CartContext';
import style from './CartItem.module.scss';

type Props = {
  product: Product;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <div className={style.cart}>
      <button
        onClick={() => removeFromCart(product.id)}
        className={style.cartClose}
      >
        <img src="img/icons/Close.svg" alt="close button" />
      </button>

      <div className={style.cartImgWrapper}>
        <img
          src={product.images[0]}
          alt="product img"
          className={style.cartImg}
        />
      </div>

      <p className={style.cartName}>{product.name}</p>

      <div className={style.cartArrow}>
        <ButtonScroll
          buttonText="img/icons/Minus.svg"
          clickFunc={() => changeQuantity(product.id, -1)}
        />

        <p className={style.quantity}>{quantity}</p>

        <ButtonScroll
          buttonText="img/icons/Plus.svg"
          clickFunc={() => changeQuantity(product.id, 1)}
        />
      </div>

      <p className={style.cartPrice}>${product.priceDiscount * quantity}</p>
    </div>
  );
};
