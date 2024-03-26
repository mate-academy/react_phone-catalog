import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonBack } from '../ButtonBack';
import './CartPage.scss';
import { DispatchContext, StateContext } from '../../store/ProductsContext';

export const CartPage: React.FC = () => {
  const { cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    setFirstRender(true);
  }, []);

  if (firstRender) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  const getTotalPrice = () => {
    let result = 0;

    cart.forEach(c => {
      result += c.quantity * c.price;
    });

    return result;
  };

  const totalPrice = getTotalPrice();

  const getTotalItems = () => {
    let result = 0;

    cart.forEach(c => {
      result += c.quantity;
    });

    return result;
  };

  const totalItems = getTotalItems();

  const handleIncreaseAmount = (itemId: string) => {
    dispatch({ type: 'increaseQuantity', payload: itemId });
  };

  const handleDecreaseAmount = (itemId: string) => {
    dispatch({ type: 'decreaseQuantity', payload: itemId });
  };

  const handleDelFromCart = (itemId: string) => {
    dispatch({ type: 'deleteFromCart', payload: itemId });
  };

  const handleCheckoutClick = () => {
    const checkout = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (checkout) {
      dispatch({ type: 'getCart', payload: [] });
    }
  };

  return (
    <div className="CartPage">
      <div className="CartPage__back">
        <ButtonBack />
      </div>
      <h1 className="CartPage__title">Cart</h1>

      {!!cart.length ? (
        <>
          <section className="CartPage__content">
            {cart.map(prod => (
              <article className="CartPage__content-card" key={prod.id}>
                <div className="CartPage__content-info">
                  <button
                    className="CartPage__content-delete"
                    data-cy="cartDeleteButton"
                    onClick={() => handleDelFromCart(prod.itemId)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        // eslint-disable-next-line max-len
                        d="M12.4721 4.47138C12.7324 4.21103 12.7324 3.78892 12.4721 3.52858C12.2117 3.26823 11.7896 3.26823 11.5292 3.52858L8.00065 7.05717L4.47206 3.52858C4.21171 3.26823 3.7896 3.26823 3.52925 3.52858C3.2689 3.78892 3.2689 4.21103 3.52925 4.47138L7.05784 7.99998L3.52925 11.5286C3.2689 11.7889 3.2689 12.211 3.52925 12.4714C3.7896 12.7317 4.21171 12.7317 4.47206 12.4714L8.00065 8.94279L11.5292 12.4714C11.7896 12.7317 12.2117 12.7317 12.4721 12.4714C12.7324 12.211 12.7324 11.7889 12.4721 11.5286L8.94346 7.99998L12.4721 4.47138Z"
                        fill="#B4BDC4"
                      />
                    </svg>
                  </button>
                  <Link
                    to={`/${prod.category}/${prod.itemId}`}
                    className="CartPage__content-link"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="CartPage__content-image"
                    />
                    <p className="CartPage__content-name">{prod.name}</p>
                  </Link>
                </div>

                <div className="CartPage__content-price">
                  <div className="CartPage__content-amount">
                    <button
                      className="
                      CartPage__content-amount-button
                      CartPage__content-minus"
                      disabled={prod.quantity === 1}
                      onClick={() => handleDecreaseAmount(prod.itemId)}
                    >
                      <img
                        src={
                          prod.quantity === 1
                            ? 'icons/Minus_light.svg'
                            : 'icons/Minus.svg'
                        }
                        alt="Minus"
                      />
                    </button>
                    <div
                      className="CartPage__content-number"
                      data-cy="productQauntity"
                    >
                      {prod.quantity}
                    </div>
                    <button
                      className="
                      CartPage__content-amount-button
                      CartPage__content-plus"
                      onClick={() => handleIncreaseAmount(prod.itemId)}
                    >
                      <img src="icons/Plus.svg" alt="Plus" />
                    </button>
                  </div>
                  <div className="CartPage__content-cost">{`$${prod.price}`}</div>
                </div>
              </article>
            ))}
          </section>

          <section className="CartPage__total">
            <div className="CartPage__total-price">
              <h2 className="CartPage__total-title">{`$${totalPrice}`}</h2>
              <p className="CartPage__total-text">
                Total for {totalItems} items
              </p>
            </div>

            <div className="CartPage__total-line"></div>
            <button
              className="CartPage__total-button"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </section>
        </>
      ) : (
        <h1 className="CartPage__empty">Your cart is empty</h1>
      )}
    </div>
  );
};
