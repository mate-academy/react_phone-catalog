import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../api/hooks';
import { productsFiltering } from '../../helpers/productsFiltering';
import { CartItem } from '../../components/CartItem';

import './Cart.scss';

const Cart: React.FC = () => {
  const cartList = useAppSelector(state => state.cart.items);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const cartListToShow = useMemo(() => {
    return productsFiltering.filterQuery(cartList, query);
  }, [cartList, query]);

  const total = cartList.reduce((acc, item) => acc
    + ((item.amount || 0) * item.price), 0);

  const totalItem = cartList.reduce((acc, item) => acc
    + (item.amount || 0), 0);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="cart">
      <div className="cart__back">
        {/* eslint-disable-next-line */}
        <button
          onClick={goBack}
          className="cart__back_button"
        >
          Back
        </button>
      </div>

      <h1 className="cart__title">Cart</h1>

      {cartList.length !== 0 ? (
        <div className="cart__wrapper">
          <section className="cart__list">
            {cartListToShow.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </section>
          <section className="cart__total">
            <p className="cart__total__number">
              {total}
            </p>
            <p className="cart__total__items">
              {`Total for ${totalItem} items`}
            </p>
            <div className="cart__total__line" />
            { /* eslint-disable-next-line */}
            <button
              className="cart__total__checkout"
              /* eslint-disable-next-line */
              onClick={() => alert('Feature is not implemented yet.')}
            >
              Checkout
            </button>
          </section>
        </div>
      ) : (
        <p className="cart__nothing">
          Your cart is empty.
        </p>
      )}

    </div>
  );
};

export default Cart;
