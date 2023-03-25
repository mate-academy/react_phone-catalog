import './cartPage.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CartList } from '../../components/CartList';
import { getCartList } from '../../components/interactionLocaleStorage';

import { Product } from '../../type/product';

export const CartPage = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    getCartList(setProducts);

    window.addEventListener('storage', () => {
      getCartList(setProducts);
    });

    return () => window.removeEventListener('storage', () => {
      getCartList(setProducts);
    });
  }, [window.localStorage]);

  useEffect(() => {
    const message = setTimeout(() => {
      setCheckout(false);
    }, 2000);

    return () => clearTimeout(message);
  }, [checkout]);

  return (
    <section className="cart">
      <div className="cart__links-container">
        <Link to="/phones" className="cart__back-link">
          <button
            data-cy="backButton"
            className="cart__back-button"
            type="button"
            aria-label="go back"
          />
        </Link>

        <Link to="/phones" className="cart__back-link">
          Back
        </Link>
      </div>

      <h1 className="cart__title">
        Cart
      </h1>

      <div className="cart__shop-list">
        <div className="cart__products">
          {products && products.length > 0 ? (
            <CartList
              products={products}
              setTotalCost={setTotalCost}
              setTotalItems={setTotalItems}
            />
          ) : (
            <h3 className="cart__title-empty">
              Your cart is empty
            </h3>
          )}
        </div>

        <div className="cart__checkout-wrapper">
          <div className="cart__total-price">
            {`$${totalCost}`}
          </div>

          <p className="cart__total-products">
            {`Total for ${totalItems} items`}
          </p>

          <button
            className="cart__checkout-button"
            type="button"
            onClick={() => setCheckout(true)}
          >
            Checkout
          </button>

          {checkout && (
            <div className="cart__message">
              We are sorry, but this feature is not implemented yet
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
