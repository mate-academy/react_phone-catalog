import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CartItem } from '../../types';
import './CartPage.scss';

import { StateContext, DispatchContext } from '../../StateProvider';

// import { StateContext } from './StateProvider';

const CartPage:React.FC = () => {
  const [onMassage, setOnMassage] = useState(false);

  const showMassage = () => {
    setOnMassage(true);

    setTimeout(() => {
      setOnMassage(false);
    }, 3000);
  };

  const { cartItems, totalItems, totalPrice } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const deleteItem = (id: string) => {
    dispatch({ type: 'deleteItem', id });
  };

  const changeCount = (id: string, option: string) => {
    dispatch({ type: 'changeCount', id, option });
  };

  if (cartItems.length < 1) {
    return (
      <div className="cartPage container">
        <div
          role="link"
          tabIndex={0}
          className="cartPage__go-back-link"
          onClick={goBack}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              goBack();
            }
          }}
        >
          <div className="cartPage__go-back-img" />
          <span className="cartPage__go-back-text">Back</span>
        </div>

        <h2 className="cartPage__title">Cart</h2>

        <p>No products added to cart</p>
      </div>
    );
  }

  return (
    <div className="cartPage container">
      <div
        role="link"
        tabIndex={0}
        className="cartPage__go-back-link"
        onClick={goBack}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            goBack();
          }
        }}
      >
        <div className="cartPage__go-back-img" />
        <span className="cartPage__go-back-text">Back</span>
      </div>

      <h2 className="cartPage__title">Cart</h2>
      <div className="cartPage__info">
        <ul>
          <TransitionGroup className="cartPage__list">
            {cartItems.map((item: CartItem) => {
              return (
                <CSSTransition
                  key={item.id}
                  timeout={500}
                  classNames="item-cart"
                >
                  <li key={item.id} className="cartPage__item">
                    <button
                      type="button"
                      className="cartPage__item-btn"
                      onClick={() => deleteItem(item.product.id)}
                    >
                      x
                    </button>
                    <img
                      className="cartPage__img"
                      src={item.product.imageUrl}
                      alt={item.id}
                    />
                    <span className="cartPage__item-title">
                      {item.product.name}
                    </span>
                    <div className="cartPage__count">
                      <button
                        type="button"
                        className="cartPage__count-btn"
                        disabled={item.quantity === 1}
                        onClick={() => changeCount(item.product.id, 'minus')}
                      >
                        -
                      </button>
                      <span className="cartPage__count-title">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="cartPage__count-btn"
                        onClick={() => changeCount(item.product.id, 'add')}
                      >
                        +
                      </button>
                    </div>
                    <span className="cartPage__price">
                      {`$${item.product.price * item.quantity}`}
                    </span>
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ul>
        <div className="cartPage__total-price">
          <span className="cartPage__total-price-title">
            {`$${totalPrice}`}
          </span>
          <span className="cartPage__total-price-subtitle">
            {`Total for ${totalItems} items`}
          </span>
          <div className="cartPage__total-price-line" />

          <button
            type="button"
            className="cartPage__total-price-btn"
            onClick={showMassage}
          >
            Checkout
          </button>
          {onMassage && (
            <span className="cartPage__massage">
              We are sorry, but this feature is not implemented yet
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
