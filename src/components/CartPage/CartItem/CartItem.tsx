import React, { useContext, useState } from 'react';
import './CartItemStyle.scss';
import { Product } from 'src/types/Product';
import { DispatchContext } from 'src/store';
import { ActionTypes } from 'src/types/ActionTypes';
import classNames from 'classnames';

interface Props {
  item: Product;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useContext(DispatchContext);
  const [counter, setCounter] = useState<number>(item.amount);
  const isMinusDisabled = counter === 1;

  const handleDeleteItem = () => {
    dispatch({
      type: ActionTypes.RemoveFromCart,
      payload: { id: item.itemId },
    });
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');

    const updatedCart = currentCart.filter(
      (elem: Product) => elem.itemId !== item.itemId,
    );

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handlePlusItem = () => {
    dispatch({ type: ActionTypes.PlusOneItem, payload: { id: item.itemId } });
    setCounter(counter + 1);
  };

  const handleMinusItem = () => {
    if (counter > 1) {
      dispatch({
        type: ActionTypes.MinusOneItem,
        payload: { id: item.itemId },
      });
      setCounter(counter - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item__main">
        <button
          className="cart-item__delete"
          onClick={() => handleDeleteItem()}
        >
          {' '}
          <img src="icons/delete-cart-item.svg " alt="" />
        </button>
        <img src={`${item.image}`} alt="" className="cart-item__img" />
        <div className="cart-item__title">{item.name}</div>
      </div>
      <div className="cart-item__footer">
        <div className="cart-item__controller">
          <button
            className={classNames(
              'cart-item__minus',
              'cart-item__controller--button',
              { 'cart-item__button-disabled': isMinusDisabled },
            )}
            onClick={() => handleMinusItem()}
          >
            <svg
              width="12"
              height="2"
              viewBox="0 0 12 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cart-item__minus--svg"
            >
              <path
                className="cart-item__minus--path"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.666016 0.99998C0.666016 0.63179 0.964492 0.333313 
                1.33268 0.333313H10.666C11.0342 0.333313 11.3327 0.63179 
                11.3327 0.99998C11.3327 1.36817 11.0342 1.66665 10.666 
                1.66665H1.33268C0.964492 1.66665 0.666016 1.36817 0.666016 
                0.99998Z"
              />
            </svg>
          </button>
          <div className="cart-item__counter">{counter}</div>
          <button
            className="cart-item__plus cart-item__controller--button"
            onClick={() => handlePlusItem()}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cart-item__plus--svg"
            >
              <path
                className="cart-item__plus--path"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.66602 1.33335C6.66602 0.965164 6.36754 0.666687 5.99935 
                0.666687C5.63116 0.666687 5.33268 0.965164 5.33268 
                1.33335V5.33335H1.33268C0.964492 5.33335 0.666016 5.63183 
                0.666016 6.00002C0.666016 6.36821 0.964492 6.66669 1.33268 
                6.66669H5.33268V10.6667C5.33268 11.0349 5.63116 11.3334 5.99935 
                11.3334C6.36754 11.3334 6.66602 11.0349 6.66602 
                10.6667V6.66669H10.666C11.0342 6.66669 11.3327 6.36821 11.3327 
                6.00002C11.3327 5.63183 11.0342 5.33335 10.666 
                5.33335H6.66602V1.33335Z"
              />
            </svg>
          </button>
        </div>
        <h3 className="cart-item__price">${item.fullPrice}</h3>
      </div>
    </div>
  );
};

export default CartItem;
