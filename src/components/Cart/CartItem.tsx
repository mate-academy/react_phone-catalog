import React, { FC, useState } from 'react';
import { CartProduct } from '../../types/CartProduct';
import close from '../../images/icons/close.svg';
import minus from '../../images/icons/minus.svg';
import plus from '../../images/icons/plus.svg';
import fake from '../../images/img/fake.webp';
import { ProductAllType } from '../../types/Product';
import { useCartFavorite } from '../../context/CartFavoriteContext';

type Props = {
  product: ProductAllType;
};

export const CartItem: FC<Props> = ({ product }) => {
  const { name, price, image, id } = product;

  const [quantity, setQuantity] = useState<number>(1);

  const { removeFromCart, updateCounterCart } = useCartFavorite();

  const isDisabledMinus = quantity <= 1;

  const handleClickPlus = () => {
    setQuantity(prev => prev + 1);
    updateCounterCart(String(product.id), quantity + 1);
  };
  const handleClickMinus = () => {
    setQuantity(prev => prev - 1);
    updateCounterCart(String(product.id), quantity - 1);
  };

  return (
    <div className="cart-item item-cart">
      <button
        className="item-cart__remove"
        type="button"
        onClick={() => removeFromCart(String(product.id))}
      >
        <img
          className="item-cart__remove-image"
          src={close}
          alt="button-close"
        />
      </button>
      <img src={image} alt="" className="item-cart__image" />
      <div className="item-cart__name">{name}</div>
      <div className="item-cart__counter">
        <button
          className="item-cart__counter-btn"
          type="button"
          disabled={isDisabledMinus}
          onClick={handleClickMinus}
        >
          <img src={minus} alt="minus" />
        </button>
        <span className="item-cart__counter-number">{quantity}</span>
        <button
          className="item-cart__counter-btn"
          type="button"
          onClick={handleClickPlus}
        >
          <img src={plus} alt="plus" />
        </button>
      </div>
      <div className="item-cart__price">${price}</div>
    </div>
  );
};
