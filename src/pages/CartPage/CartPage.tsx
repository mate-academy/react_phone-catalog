import { useMemo, useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';
import { useAppSelector } from '../../app/hooks';
import { getProductDiscount } from '../../utils/getProductDiscount';

import './CartPage.scss';

export const CartPage = () => {
  const [isCheckOut, SetIsCheckOut] = useState(false);

  const { cartItems } = useAppSelector(state => state.cartItems);

  const isCartEmpty = useMemo(() => {
    return cartItems.length === 0;
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      const price = cartItem.product.discount > 0
        ? getProductDiscount(cartItem.product)
        : cartItem.product.price;

      return acc + price * cartItem.quantity;
    }, 0);
  }, [cartItems]);

  const cartQuantity = useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <section className="Page-Cart Cart">
      <BackButton />

      <h1 className="Cart-Title SectionTitle">Cart</h1>

      {isCartEmpty && 'Your cart is empty'}

      {isCheckOut && 'We are sorry, but this feature is not implemented yet'}

      {!isCheckOut && !isCartEmpty
        && (
          <div className="Cart-Content">
            <ul className="Cart-List">
              {cartItems.map(cartItem => (
                <li className="Cart-CartItem CartItem" key={cartItem.id}>
                  <CartItem cartItem={cartItem} />
                </li>
              ))}
            </ul>

            <div className="Cart-Totals">
              <span className="Cart-TotalPrice">{`$${cartTotal}`}</span>

              <span className="Cart-TotalQuantity" data-cy="productQuantity">
                {`Total for ${cartQuantity} items`}
              </span>

              <hr className="Cart-Break" />

              <button
                className="Cart-Button Button"
                type="button"
                onClick={() => SetIsCheckOut(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
    </section>
  );
};
