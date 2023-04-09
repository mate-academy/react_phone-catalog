/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import {
  removeOneCart,
  addOneCart,
  deleteCart,
} from '../utils/cartApi';
import { ProductsContext } from '../context/ProductsContext';
import { Cart } from '../types/Cart';

type Props = {
  cart: Cart,
};

export const CartItem: React.FC<Props> = ({
  cart,
}) => {
  const { cartList, setCartList } = useContext(ProductsContext);

  return (
    <div className="cart-block">
      <button
        className="cart-block__cross"
        data-cy="cartDeleteButton"
        type="button"
        onClick={() => setCartList(deleteCart(cartList, cart))}
      />
      <img
        className="cart-block__image"
        src={cart.image}
        alt={cart.name}
      />
      <div className="cart-block__model">
        {cart.name}
      </div>
      <div className="cart-select">
        <button
          className="cart-select__minus"
          disabled={cart.quantity === 1}
          type="button"
          onClick={() => setCartList(removeOneCart(cartList, cart))}
        />
        <div className="cart-select__number">
          {cart.quantity}
        </div>
        <button
          className="cart-select__plus"
          type="button"
          onClick={() => setCartList(addOneCart(cartList, cart))}
        />
      </div>
      <h2 className="cart-block__price">
        {`$${cart.price}`}
      </h2>
    </div>
  );
};
