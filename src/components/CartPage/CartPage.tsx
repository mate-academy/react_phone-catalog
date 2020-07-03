import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getItems } from '../../store';
import { removeFromCart, setQuantity } from '../../store/cart';
import './CartPage.scss';

const CartPage = () => {
  const cartItems = useSelector(getItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((sum, { quantity, product }) => (
    sum + quantity * (product.price - product.price * (product.discount / 100))
  ), 0);

  return (
    <>
      <div className="CartPage">

        <div className="CartPage__title">
          <p className="CartPage__name">CartPage</p>
        </div>
        <div className="CartPage__container">
          <ul className="CartPage__list">

            {cartItems.map(item => (
              <li key={item.product.id} className="CartPage__item">
                <button
                  type="button"
                  className="CartPage__button CartPage__button--remove"
                  aria-label="delete item from cart"
                  onClick={() => dispatch(removeFromCart(item.product))}
                />

                <div className="CartPage__photo">
                  <img alt="card" src={item.product.imageUrl} className="CartPage__img" />
                </div>

                <p className="CartPage__product--title">{item.product.name}</p>

                <div className="CartPage__changeQuantity">
                  <button
                    type="button"
                    aria-label="decrease"
                    disabled={item.quantity <= 1}
                    className={classNames('CartPage__button CartPage__button--decrease',
                      {
                        'CartPage__button--decrease': item.quantity <= 1,
                      })}
                    onClick={() => dispatch(setQuantity(item.product, item.quantity - 1))}
                  />

                  <p className="CartPage__button--counter">{item.quantity}</p>
                  <button
                    type="button"
                    aria-label="increase"
                    className="CartPage__button CartPage__button--increase"
                    onClick={() => dispatch(setQuantity(item.product, item.quantity + 1))}
                  />

                </div>

                <div className="CartPage__price ">
                  {item.product.discount !== 0
                    ? (
                      <span className="CartPage__price--withDiscount">
                        {' '}
                        $
                        {item.product.price - item.product.price * (item.product.discount / 100)}
                      </span>
                    ) : (
                      <span className="CartPage__price--withoutDiscount">
                        {' '}
                        $
                        {item.product.price}
                      </span>
                    )}
                </div>
              </li>
            ))}
          </ul>
          <div className="CartPage__totalPrice ">
            <div className="CartPage__totalPrice--container ">
              <p className="CartPage__value ">
                $
                {totalPrice}
              </p>
              <p className="CartPage__text">
                total for
                {' '}
                {cartItems.length}
                {' '}
                items
              </p>
              <hr />
              <button
                type="button"
                className="CartPage__button--checkout"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
