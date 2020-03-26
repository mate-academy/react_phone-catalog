import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Basket {
  id: string;
  phone: string;
  quantity: number;
}

interface Props {
  basket: Basket[];
  removeItem: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

export const Basket: FC<Props> = ({
  basket,
  removeItem,
  onIncrement,
  onDecrement,
}) => {
  if (basket.length > 0) {
    return (
      <div className="basket">
        <h2>Cart</h2>
        <ul>
          {basket.length && (basket.map(item => (
            <li className="basket__item" key={item.id}>
              <button
                className="basket__remove"
                type="button"
                onClick={() => {
                  removeItem(item.id);
                }}
              />
              <p className="basket__name">{item.id}</p>
              <button
                className="basket__counter basket__counter--minus"
                type="button"
                onClick={() => onDecrement(item.id)}
                disabled={item.quantity === 1}
              />
              <p className="basket__quantity">{`${item.quantity}`}</p>
              <button
                className="basket__counter basket__counter--plus"
                type="button"
                onClick={() => onIncrement(item.id)}
              />
              <Link className="link" to={item.phone}>
                <p>See details</p>
              </Link>
            </li>
          )))}
        </ul>
      </div>
    );
  }

  return (
    <div className="basket">
      <h2>Cart</h2>
      <p>Your cart is empty...</p>
    </div>
  );
};
