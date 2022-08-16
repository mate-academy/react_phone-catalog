import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartItem } from '../../components/CartItem';
import { CartContext } from '../../context/CartProvider';
import './Cart.scss';

export const Cart: React.FC = () => {
  const { order } = useContext(CartContext);

  const [totalSum, setTotalSum] = useState(0);

  const countTotalSum = () => setTotalSum(
    order.reduce(
      (sum, cur) => sum + cur.priceWithDiscount * cur.quantityInOrder,
      0,
    ),
  );

  const [totalQuantity, setTotalQuantity] = useState(0);

  const countTotalQuantity = () => setTotalQuantity(
    order.reduce(
      (sum, current) => sum + current.quantityInOrder,
      0,
    ),
  );

  const [message, setMessage] = useState(false);

  useEffect(() => {
    countTotalSum();
    countTotalQuantity();
  }, []);

  useEffect(() => {
    countTotalQuantity();
  }, [order]);

  return (
    <div className="Cart">
      <NavLink
        to="/home"
        className="Cart__backToHome"
      >
        &#60;
        <p className="Cart__back">Back</p>
      </NavLink>
      <h1 className="Cart__title">Cart</h1>
      {order.length === 0 && (
        <h2 className="Cart__isEmpty">Your cart is empty</h2>
      )}
      {order.length > 0 && (
        <div className="Cart__conteiner">
          <ul className="Cart__itemsList">
            {order.map(item => (
              <li key={item.id}>
                <CartItem
                  item={item}
                  countTotalSum={countTotalSum}
                  countTotalQuantity={countTotalQuantity}
                />
              </li>
            ))}
          </ul>
          <div className="Cart__totalOrder">
            <span className="Cart__sum">
              &#36;
              {totalSum}
            </span>
            <p className="Cart__totalItems">
              {order.length === 1
                ? 'Total for 1 item'
                : `Total for ${totalQuantity} items`}
            </p>
            <button
              type="button"
              className="Cart__checkout"
              onClick={(event) => {
                event.preventDefault();
                setMessage(true);
              }}
            >
              Checkout
            </button>
            {message && (
              <span
                className="Cart__message"
              >
                We are sorry, but this feature is not implemented yet
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
