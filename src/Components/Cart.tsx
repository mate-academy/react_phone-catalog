import { Link } from 'react-router-dom';
import React from 'react';
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
  selectedCapacity?: string;
  selectedColor?: string;
}

export interface CartItem extends NewModel {
  quantity: number;
}

interface Props {
  addingChangedThings?: string;
  cart?: CartItem[];
  setcart: (cart: CartItem[]) => void;
  addingObjCart: (cart: NewModel) => void;
  onIncrease: (cartId: string) => void;
  onDecrease: (cartId: string) => void;
  setsmth?: (product: NewModel) => void;
}

export const Cart: React.FC<Props> = ({
  addingObjCart,
  cart = [],
  setcart,
  onIncrease,
  onDecrease,
  setsmth,
}) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="Cart">
      <div className="rootline">
        <Link to="/">
          <img src="img/Home.svg" alt="Home" />
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
            const newName = `${obj.name.replace(/\s+(\d+(GB|TB)|\d+mm)\s+.+$/, '')} ${obj.capacity} ${obj.color}`;

            return (
              <div className="one__model" key={obj.itemId}>
                <button
                  type="button"
                  className="crossButton"
                  onClick={() => addingObjCart(obj)}
                  aria-label="Remove item"
                />

                <Link
                  to={`/${obj.category}/${obj.itemId}`}
                  onClick={() => {
                    if (setsmth) {
                      setsmth(obj);
                    }
                  }}
                >
                  <img className="Count__image" src={obj.image} alt={newName} />
                </Link>

                <Link
                  to={`/${obj.category}/${obj.itemId}`}
                  onClick={() => {
                    if (setsmth) {
                      setsmth(obj);
                    }
                  }}
                  className="obj__title"
                >
                  {newName}
                </Link>

                <div className="Counter">
                  <button
                    type="button"
                    className="minus"
                    aria-label="Decrease quantity"
                    disabled={obj.quantity <= 1}
                    onClick={() => onDecrease(obj.itemId)}
                  />
                  <p className="Counter__item">{obj.quantity}</p>
                  <button
                    type="button"
                    className="plus"
                    aria-label="Increase quantity"
                    onClick={() => onIncrease(obj.itemId)}
                  />
                </div>

                <p className="price__of__item">${obj.price * obj.quantity}</p>
              </div>
            );
          })}
        </div>

        <div className="Count__Total">
          <p className="Count__dollar">${totalPrice}</p>
          <p className="Count__items">Total for {totalItems} items</p>
          <span className="line"></span>
          <button
            type="button"
            className="Count__button"
            onClick={() => {
              setcart([]);
              alert(
                /*eslint-disable-next-line */
                'Your products were added, but the server things are not created yet',
              );
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
