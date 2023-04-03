import classNames from 'classnames';
import { useContext } from 'react';
import { CartProduct } from '../../types/CartProduct';
import { CartContext, QuantityActions } from '../contexts/CartContextProvider';
import './style.scss';

type CartItemProps = {
  cartItem: CartProduct,
};

export const CartItem: React.FC<CartItemProps> = ({
  cartItem,
}) => {
  const { removeFromCart, handleQuantityChange } = useContext(CartContext);
  const { product, quantity } = cartItem;
  const cartItemId = cartItem.id;
  const {
    image,
    name,
    price,
    id,
  } = product;

  const handleRemovingFromCart = () => {
    if (removeFromCart) {
      removeFromCart(id);
    }
  };

  const handlePlusQuantity = () => {
    if (handleQuantityChange) {
      handleQuantityChange(cartItemId, QuantityActions.Increase);
    }
  };

  const handleMinusQuantity = () => {
    if (handleQuantityChange) {
      handleQuantityChange(cartItemId, QuantityActions.Decrease);
    }
  };

  const isDisabled = quantity <= 1;

  return (
    <div className="cart-item">
      <button
        data-cy="cartDeleteButton"
        type="button"
        onClick={handleRemovingFromCart}
      >
        <i className="cart-item__cross icon icon--cross" />
      </button>
      <img
        className="cart-item__image"
        src={image}
        alt={image}
      />
      <p className="cart-item__name">
        {name}
      </p>
      <div className="cart-item__quantity">
        <button
          className={classNames(
            'cart-item__btn',
            'cart-item__quantity-decrease',
            {
              'cart-item__quantity-decrease--disabled': isDisabled,
            },
          )}
          type="button"
          aria-label="qunatity-decrease"
          onClick={handleMinusQuantity}
        />
        <p
          className="cart-item__quantity-text"
          data-cy="productQauntity"
        >
          {quantity}
        </p>
        <button
          onClick={handlePlusQuantity}
          className="cart-item__btn cart-item__quantity-increase"
          type="button"
          aria-label="qunatity-increase"
        />
      </div>
      <p className="cart-item__price">
        {`$${price * quantity}`}
      </p>
    </div>
  );
};
