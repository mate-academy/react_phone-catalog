import React from 'react';
import './CartItem.scss';
import { CartItemType } from '../../helpers/types/CartItemType';
import { ButtonCroce } from '../ButtonCroce';
import { ButtonQuantity } from '../ButtonQuantity';

type Props = {
  productData: CartItemType;
  deleteFromCart: (id: string) => void;
  changQuantity: (isIncrease: boolean, id: string) => void;
};

export const CartItem: React.FC<Props> = ({
  productData,
  deleteFromCart,
  changQuantity,
}) => {
  const { name, price, image, quantity, id } = productData;

  const totalPrice = price * quantity;

  return (
    <article className="cart-item">
      <div className="cart-item__croce">
        <ButtonCroce handleClick={deleteFromCart} id={id} />
      </div>

      <img src={`./api/${image}`} alt="product" className="cart-item__img" />

      <p className="cart-item__name">{name}</p>

      <div className="cart-item__quantity">
        <ButtonQuantity
          handleClick={changQuantity}
          isIncrease={false}
          id={id}
          isDisable={quantity === 1}
        />

        <span className="cart-item__quantity-count">{quantity}</span>

        <ButtonQuantity
          handleClick={changQuantity}
          isIncrease
          id={id}
          isDisable={false}
        />
      </div>

      <h2 className="cart-item__price">{`$${totalPrice}`}</h2>
    </article>
  );
};
