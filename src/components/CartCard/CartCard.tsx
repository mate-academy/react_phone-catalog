/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import './CartCard.scss';
import { IMG_LINK } from '../../utils/fetchClient';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as action from '../../store/features/cart';

export const CartCard = () => {
  const { cartStorage } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const [checkoutText, setCheckoutText] = useState('Checkout');
  const notImplementedText = 'We are sorry, but this feature is not implemented yet';

  const amount = useMemo(() => {
    return cartStorage
      .reduce((num, product) => (product.price * product.qnty) + num, 0);
  }, [cartStorage]);

  const quantity = useMemo(() => {
    return cartStorage.reduce((num, product) => product.qnty + num, 0);
  }, [cartStorage]);

  useEffect(() => {
    setTimeout(() => {
      setCheckoutText('Checkout');
    }, 3000);
  }, [checkoutText]);

  return (
    <div className="cart-container">
      {cartStorage.length < 1 ? (
        <div className="empty-cart">
          <h1 className="checkout__price">
            Your cart is empty
          </h1>
        </div>
      ) : (
        <div className="cards__container">
          {cartStorage.map((product, i) => (
            <div className="added-card" key={product.id + i}>
              <button
                type="button"
                aria-label="delete"
                className="added-card__delete"
                onClick={() => dispatch(action.remove(product.id))}
              />

              <img
                src={IMG_LINK + product.image}
                alt={product.name}
                width="66"
                height="66"
                className="added-card__img"
              />

              <h1 className="added-card__title">
                {product.name}
              </h1>

              <div className="added-card__btn-container">
                <button
                  type="button"
                  aria-label="minus"
                  className={classNames(
                    'added-card__btn added-card__btn--minus',
                    { 'added-card__btn--disabled': product.qnty < 1 },
                  )}
                  onClick={() => dispatch(action.decrement(product.id))}
                  disabled={product.qnty < 1}
                />

                <p className="added-card__num">
                  {product.qnty}
                </p>

                <button
                  type="button"
                  aria-label="plus"
                  className="added-card__btn added-card__btn--plus"
                  onClick={() => dispatch(action.increment(product.id))}
                />
              </div>

              <p className="added-card__price">
                {`${product.price}$`}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="checkout">
        <div className="checkout__price-container">
          <h1 className="checkout__price">
            {`$${amount}`}
          </h1>

          <p className="checkout__qnty">
            {`Total for ${quantity} items`}
          </p>
        </div>

        <button
          type="button"
          aria-label="checkout"
          className="checkout__btn"
          onClick={() => setCheckoutText(notImplementedText)}
        >
          {checkoutText}
        </button>

      </div>
    </div>
  );
};
