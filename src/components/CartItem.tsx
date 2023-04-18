/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import classNames from 'classnames';
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
  const cartImage
  = `${cart.image}`;

  const handleMinusButton = () => {
    setCartList(removeOneCart(cartList, cart));
  };

  const handlePlusButton = () => {
    setCartList(addOneCart(cartList, cart));
  };

  const handleCrossButton = () => {
    setCartList(deleteCart(cartList, cart));
  };

  return (
    <div className="cart-block">
      <button
        className="cart-block__cross"
        data-cy="cartDeleteButton"
        type="button"
        onClick={handleCrossButton}
      />
      <img
        className="cart-block__image"
        src={cartImage}
        alt={cart.name}
      />
      <div className="cart-block__model">
        {cart.name}
      </div>
      <div className="cart-select">
        <button
          className={classNames(
            'cart-select__minus',
            { 'cart-select__minus--disabled': cart.quantity === 1 },
          )}
          disabled={cart.quantity === 1}
          type="button"
          onClick={handleMinusButton}
        />
        <div className="cart-select__number">
          {cart.quantity}
        </div>
        <button
          className="cart-select__plus"
          type="button"
          onClick={handlePlusButton}
        />
      </div>
      <h2 className="cart-block__price">
        {`$${cart.price}`}
      </h2>
    </div>
  );
};
