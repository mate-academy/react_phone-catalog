import { useContext } from 'react';
import { CartCard } from '../CartCard/CartCard';
import { IconsBar } from '../IconsBar/IconsBar';
import './Cart.scss';
import { CartContext } from '../utils/contexts';

export const Cart = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return;
  }

  const { cart } = cartContext;
  const cartQuantity = cart.reduce(
    (acc, cartProduct) => acc + (cartProduct.quantity ?? 1),
    0,
  );

  return (
    <div className="cart">
      <div className="container">
        <IconsBar pageType="cart" />
        <h2 className="title">Cart</h2>
        <div className="cart__cards">
          {cart.map(cartProduct => (
            <CartCard product={cartProduct} key={cartProduct.id} />
          ))}
        </div>

        <div className="cart__checkout-block">
          <span className="cart__price">
            {`$${cart.reduce((acc, cartProduct) => acc + cartProduct.price * (cartProduct.quantity ?? 1), 0)}`}
          </span>

          <span className="text">
            {cartQuantity === 1
              ? `Total for 1  item`
              : `Total for ${cartQuantity} items`}
          </span>
          <button className="cart__button">Checkout</button>
        </div>
      </div>
    </div>
  );
};
