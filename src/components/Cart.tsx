import { useSelector } from 'react-redux';

import { Phone } from '../type/Phone';

import { ProductField } from './ProductField';
import { RootState } from '../Reducer/store';

export const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const totalPrice = cart.reduce(
    (accumulator: number,
      currentValue: Phone) => {
      return accumulator + currentValue.price * currentValue.count;
    },
    0,
  );

  return (
    <div className="cart">
      <h1 className="cart__title">Cart</h1>

      <div className="cart__content">
        <ul className="cart__list">
          {cart.map((product: Phone) => (
            <ProductField product={product} key={product.itemId} />
          ))}
        </ul>

        <div className="cart__summary">
          <p className="cart__summary-text">
            <span>{`$${totalPrice}`}</span>
            <span className="cart__summary-total">
              Total for
              {' '}
              {cart.length}
              {' '}
              items
            </span>
          </p>

          <hr />

          <button
            type="button"
            className="cart__checkout-button"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
