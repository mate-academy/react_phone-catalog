import { useState, useEffect } from 'react';
import { useCart } from '../Contexsts/CartContext';
import { Product } from '../../Types/Product';
import { getItems } from '../../services/fetch';
import './CartItem.scss';
import cross from '../../images/cross.svg';
import plus from '../../images/Plus.svg';
import minus from '../../images/Minus.svg';

type Props = {
  id: number;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ id, quantity }) => {
  const [items, setItems] = useState<Product[]>([]);
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  useEffect(() => {
    getItems().then((products) => setItems(products));
  });

  const item = items.find((i) => i.id === id);

  return (
    <div className="cart">
      <div className="cart__inner">
        <div className="cart__item">
          <button
            type="button"
            onClick={() => removeFromCart(id)}
            className="cart__item--remove"
          >
            <img src={cross} alt="remove" />
          </button>
          <img className="cart__item--img" src={`_new/${item?.image}`} alt="" />
          <p className="cart__item--name">{item?.name}</p>
          <div className="cart__item--quantity">
            <button
              type="button"
              className="cart__item--quantity-button"
              onClick={() => decreaseQuantity(id)}
            >
              <img src={minus} alt="decrease" />
            </button>
            <p className="cart__item--quantiry-number">{quantity}</p>
            <button
              type="button"
              className="cart__item--quantity-button"
              onClick={() => increaseQuantity(id)}
            >
              <img src={plus} alt="increase" />
            </button>
          </div>
          <p className="cart__item--price">{`$${item?.price}`}</p>
        </div>
      </div>
    </div>
  );
};
