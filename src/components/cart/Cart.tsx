import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../store';
import { deleteFromCart } from '../../store/cart';

const CartLink = () => {
  return (
    <>
      <Link className="actions__item actions-cart" to="/Cart">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.46683 0.933323C2.59273 0.765453 2.79032 0.666656 3.00016 0.666656H11.0002C11.21 0.666656 11.4076 0.765453 11.5335 0.933323L13.5335 3.59999C13.62 3.71539 13.6668 3.85574 13.6668 3.99999V13.3333C13.6668 13.8638 13.4561 14.3725 13.081 14.7475C12.706 15.1226 12.1973 15.3333 11.6668 15.3333H2.3335C1.80306 15.3333 1.29436 15.1226 0.919282 14.7475C0.54421 14.3725 0.333496 13.8638 0.333496 13.3333V3.99999C0.333496 3.85574 0.380281 3.71539 0.466829 3.59999L2.46683 0.933323ZM3.3335 1.99999L1.66683 4.22221V13.3333C1.66683 13.5101 1.73707 13.6797 1.86209 13.8047C1.98712 13.9298 2.15669 14 2.3335 14H11.6668C11.8436 14 12.0132 13.9298 12.1382 13.8047C12.2633 13.6797 12.3335 13.5101 12.3335 13.3333V4.22221L10.6668 1.99999H3.3335Z" fill="#313237" />
          <path fillRule="evenodd" clipRule="evenodd" d="M0.333496 4.00001C0.333496 3.63182 0.631973 3.33334 1.00016 3.33334H13.0002C13.3684 3.33334 13.6668 3.63182 13.6668 4.00001C13.6668 4.3682 13.3684 4.66668 13.0002 4.66668H1.00016C0.631973 4.66668 0.333496 4.3682 0.333496 4.00001Z" fill="#313237" />
          <path fillRule="evenodd" clipRule="evenodd" d="M4.33366 6C4.70185 6 5.00033 6.29848 5.00033 6.66667C5.00033 7.1971 5.21104 7.70581 5.58611 8.08088C5.96118 8.45595 6.46989 8.66667 7.00033 8.66667C7.53076 8.66667 8.03947 8.45595 8.41454 8.08088C8.78961 7.70581 9.00033 7.1971 9.00033 6.66667C9.00033 6.29848 9.2988 6 9.66699 6C10.0352 6 10.3337 6.29848 10.3337 6.66667C10.3337 7.55072 9.98247 8.39857 9.35735 9.02369C8.73223 9.64881 7.88438 10 7.00033 10C6.11627 10 5.26842 9.64881 4.6433 9.02369C4.01818 8.39857 3.66699 7.55072 3.66699 6.66667C3.66699 6.29848 3.96547 6 4.33366 6Z" fill="#313237" />
        </svg>
      </Link>
    </>
  );
};

export const Cart = () => {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Cart</h1>
      <div className="Card">
        <ul className="Cart__List">
          {cart.map(item => (
            <li key={item.good.id} className="CartItem">

              <div className="CartItem__Photo-Container">
                <img alt="card" src={item.good.imageUrl} className="CartItem__Photo" />
              </div>
              <p className="CartItem__TitleProduct">{item.good.name}</p>
              <button
                type="button"
                className="CartItem__Btn RemoveBtn"
                aria-label="Remove Button"
                onClick={() => dispatch(deleteFromCart(item.good))}
              >
                Delete from Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CartLink;
