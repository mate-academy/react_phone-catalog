import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { StoragesContext } from '../../Context/StoragesContext';
import './CartCard.scss';

export const CartCard = () => {
  const {
    cartStorage,
    totalAmountAndQnty,
    handleDeleteProduct,
    handleQntyOfProduct,
  } = useContext(StoragesContext);
  const [checkoutText, setCheckoutText] = useState('Checkout');
  // eslint-disable-next-line max-len
  const notImplementedText = 'We are sorry, but this feature is not implemented yet';

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
          {cartStorage.map(product => (
            <div className="added-card" key={product.id}>
              <button
                type="button"
                aria-label="delete"
                className="added-card__delete"
                onClick={() => handleDeleteProduct(product.id)}
              />

              <img
                src={`/_new/${product.image}`}
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
                  onClick={() => handleQntyOfProduct(product.id, 'minus')}
                  disabled={product.qnty < 1}
                />

                <p className="added-card__num">
                  {product.qnty}
                </p>

                <button
                  type="button"
                  aria-label="plus"
                  className="added-card__btn added-card__btn--plus"
                  onClick={() => handleQntyOfProduct(product.id, 'plus')}
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
            {`$${totalAmountAndQnty.amount}`}
          </h1>

          <p className="checkout__qnty">
            {`Total for ${totalAmountAndQnty.qnty} items`}
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
