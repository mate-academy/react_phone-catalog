import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/cart.scss';

export interface NewModel {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface Props {
  cart?: NewModel[];
  addingObjCart: (cart: NewModel) => void;
}

export const Cart: React.FC<Props> = ({ addingObjCart, cart = [] }) => {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const getItemCount = (id: number) => quantities[id] || 1;

  const handleIncrease = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (obj: NewModel) => {
    const currentCount = getItemCount(obj.id);

    if (currentCount > 1) {
      setQuantities(prev => ({
        ...prev,
        [obj.id]: currentCount - 1,
      }));
    } else {
      addingObjCart(obj);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * getItemCount(item.id),
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + getItemCount(item.id), 0);

  return (
    <div className="Cart">
      <div className="rootline">
        <Link to="/">
          <img src="/img/Home.svg" alt="Home" />
        </Link>
        <p className="root__arrow"></p>
        <Link to="/cart" className="root__thing">
          Cart
        </Link>
      </div>

      <h1 className="Favouties__header">Cart</h1>

      <div className="Count__Box">
        <div className="Count__List">
          {cart.map(obj => {
            const count = getItemCount(obj.id);

            return (
              <div className="one__model" key={obj.id}>
                <button
                  type="button"
                  className="crossButton"
                  onClick={() => addingObjCart(obj)}
                  aria-label="Remove item"
                />

                <img className="Count__image" src={obj.image} alt={obj.name} />

                <p className="obj__title">{obj.name}</p>

                <div className="Counter">
                  <button
                    type="button"
                    className="minus"
                    aria-label="Decrease quantity"
                    onClick={() => handleDecrease(obj)}
                  />
                  <p className="Counter__item">{count}</p>
                  <button
                    type="button"
                    className="plus"
                    aria-label="Increase quantity"
                    onClick={() => handleIncrease(obj.id)}
                  />
                </div>

                <p className="price__of__item">${obj.price * count}</p>
              </div>
            );
          })}
        </div>

        <div className="Count__Total">
          <p className="Count__dollar">${totalPrice}</p>
          <p className="Count__items">Total for {totalItems} items</p>
          <span className="line"></span>
          <button type="button" className="Count__button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
