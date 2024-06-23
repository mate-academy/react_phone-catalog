/* eslint-disable jsx-a11y/control-has-associated-label */
import './CartPage.scss';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../components/CartContext';
import { Product } from '../../types/Product';
import { CartItem } from '../../components/CartItem';

export const CartPage = () => {
  const { cartProducts } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);

  const clickChekcout = () => {
    setIsCheckout(true);

    setTimeout(() => {
      setIsCheckout(false);
    }, 3000);
  };

  useEffect(() => {
    cartProducts.forEach((cartProduct: [Product, number]) => {
      setTotalPrice(
        previewTotalPrice =>
          previewTotalPrice + cartProduct[0].price * cartProduct[1],
      );
      setTotalCount(previewTotalCount => previewTotalCount + cartProduct[1]);
    });
  }, []);

  return (
    <div className="cartPage">
      {(cartProducts.length === 0 && (
        <div className="cartPage__no-results">Your cart is empty</div>
      )) || (
        <>
          {isCheckout && (
            <div className="cartPage__checkout">
              We are sorry, but this feature is not implemented yet
            </div>
          )}

          <Link
            to=".."
            relative="path"
            className="cartPage__back"
            data-cy="backButton"
          >
            <div className="icon icon--arrow-left" />
            Back
          </Link>

          <div className="cartPage__title">Cart</div>

          <div className="cartPage__elements">
            <div className="cartPage__product-list">
              {cartProducts.map((cartProduct, i) => (
                <CartItem
                  cartProduct={cartProduct}
                  productIndex={i}
                  setTotalPrice={setTotalPrice}
                  setTotalCount={setTotalCount}
                />
              ))}
            </div>

            <div>
              <div className="cartPage__information">
                <div className="cartPage__total-price">{`$${totalPrice}`}</div>
                <div className="cartPage__total-count">{`Total for ${totalCount} items`}</div>
                <div className="cartPage__line" />
                <button
                  className="button cartPage__button"
                  type="button"
                  onClick={clickChekcout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
