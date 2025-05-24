import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getTotals,
  clearCart,
} from '../features/cart';
import './CartPage.scss';
import Swal from 'sweetalert2';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector(
    (state: RootState) => state.cart,
  );

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const handleRemoveFromCart = (cartItem: string) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleIncrease = (product: string) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecrease = (product: string) => {
    dispatch(decreaseQuantity(product));
  };

  // const handleClearCart = () => {
  //   const confirmed = window.confirm(
  //     'Checkout is not implemented yet. Do you want to clear the Cart?',
  //   );
  //   if (confirmed) {
  //     dispatch(clearCart());
  //   }
  // };

  const handleCheckoutClick = () => {
    Swal.fire({
      title: 'Checkout is not implemented yet. Do you want to clear the Cart?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        title: 'swal-title-custom',
        confirmButton: 'swal-button-grey',
        cancelButton: 'swal-button-grey',
      },
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(clearCart());
      } else {
        return;
      }
    });
  };

  return (
    <div className="section" id="cart">
      <div className="cart">
        <div
          className="top__back__link"
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer' }}
        >
          <IoIosArrowBack color="#313237" />
          <p>Back</p>
        </div>
        <h1 id="heading1" className="cart__h1">
          Cart
        </h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="shopping__list">
            <div className="cart__items">
              {cartItems.map(product => (
                <div className="cart__item" key={product.name}>
                  <div className="cart__item__data">
                    <button
                      className="remove"
                      onClick={() => handleRemoveFromCart(product)}
                    >
                      X
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cart__img"
                    />
                    <p className="cart__item__name">{product.name}</p>
                  </div>
                  <div className="cart__count__wrap">
                    <div className="cart__count">
                      <button
                        className="minus"
                        onClick={() => handleDecrease(product)}
                      >
                        -
                      </button>
                      <div className="cart__quantity">
                        {product.cartQuantity}
                      </div>
                      <button
                        className="plus"
                        onClick={() => handleIncrease(product)}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart__item__price">
                      ${product.price * product.cartQuantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout">
              <div className="checkout__info">
                <p className="checkout__price">${cartTotalAmount}</p>
                <p className="checkout__amount">
                  Total for {cartTotalQuantity} items
                </p>
                <hr />
              </div>

              <button
                className="checkout__button"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
