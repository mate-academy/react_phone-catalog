import { useNavigate } from 'react-router-dom';
import './Cart.scss';
import { useContext, useState } from 'react';
import { PageContext } from '../../utils/GlobalContext';
import { CartPosition } from './CartPosition';

export const Cart = () => {
  const {
    totalCount,
    totalNumber,
    products,
    cardList,
  } = useContext(PageContext);
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(false);

  const productsOnCart = products.filter(p => cardList.includes(p.id));

  const getTotalAmount = () => {
    let result = 0;

    totalCount.forEach(el => {
      result += el.price * el.count;
    });

    return result;
  };

  const totalAmount = getTotalAmount();

  return (
    <div className="cart">
      <button
        className="cart__back"
        type="button"
        onClick={() => navigate(-1)}
      >
        <div className="cart__back-arrow" />
        <p className="cart__back-text">Back</p>
      </button>

      <h1 className="cart__title">Cart</h1>

      <div className="cart__body">
        {productsOnCart.length
          ? (
            <>
              <div className="cart__list">
                {productsOnCart.map(product => {
                  return (
                    <CartPosition
                      product={product}
                      key={product.id}
                    />
                  );
                })}
              </div>

              <div className="cart__sum">
                <p className="cart__total-sum">{`$${totalAmount}`}</p>
                <p className="cart__total-text">{`Total for ${totalNumber} items`}</p>

                <button
                  className="cart__checkout"
                  aria-label="cart checkout"
                  type="submit"
                  onClick={() => setCheckout(true)}
                >
                  Checkout
                </button>

                {checkout
                  && (
                    <div className="cart__checkout-container">
                      <div className="cart__checkout-answer">
                        <button
                          type="button"
                          aria-label="close cheakout"
                          className="cart__checkout-close"
                          onClick={() => setCheckout(false)}
                        />
                        <p className="cart__checkout-message">
                          We are sorry, but this feature is not implemented yet
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </>
          ) : (
            <h2 className="cart__empty">Your cart is empty</h2>
          )}

      </div>
    </div>
  );
};
