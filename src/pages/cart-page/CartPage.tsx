import { useContext } from 'react';

import './styles.scss';

import { Back, Button, CartProduct } from '../../libs/components';
import {
  StateContext,
} from '../../libs/components/state-provider/state-context';

export const CartPage: React.FC = () => {
  const { cart } = useContext(StateContext);

  const totalItems = cart.length;
  const totalСost = cart.reduce((sum, { price, quantity }) => (
    sum + quantity * price
  ), 0);

  return (
    <main className="cart">
      <div className="cart__container">
        <div className="cart__top">
          <Back className="cart__back" />

          <h1>Cart</h1>
        </div>

        {totalItems ? (
          <section className="cart__content">
            <section className="cart__products">
              {cart.map(productInCart => (
                <CartProduct productInCart={productInCart} />
              ))}
            </section>

            <section className="cart__checkout">
              <div className="cart__checkout-total">
                <div className="cart__checkout-price">
                  {`$${totalСost}`}
                </div>

                <div
                  className="cart__checkout-quantity"
                  data-cy="productQauntity"
                >
                  {`Total for ${totalItems} items`}
                </div>
              </div>

              <Button className="cart__checkout-btn">
                Checkout
              </Button>
            </section>
          </section>
        ) : (
          <h2>The cart is empty</h2>
        ) }

      </div>
    </main>
  );
};
