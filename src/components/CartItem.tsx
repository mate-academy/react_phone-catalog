/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/context';
import { CartProps } from '../helpers/Types';

export type CartItemProps = {
  cartItem: CartProps
};

export const CartItem = ({ cartItem }: CartItemProps) => {
  const {
    id, quantity, product,
  } = cartItem;
  const {
    removeFromCart,
    decreaseQuantityInCart,
    increaseQuantityInCart,
  } = useMyContext();

  return (
    <div className="cartItem" key={id}>
      <button
        type="button"
        aria-label="remove-button"
        className="cartItem__remove-button"
        onClick={() => removeFromCart(id)}
        data-cy="cartDeleteButton"
      />
      <Link
        to={`/${product.type}s/${product.id}`}
        className="cartItem__link"
      >
        <img
          alt={product.id}
          src={product.imageUrl}
          className="cartItem__link--image"
        />
        <p className="cartItem__link--title BodyText">{product.name}</p>
      </Link>
      <div className="cartItem__quantity BodyText">
        <button
          type="button"
          aria-label="minus-button"
          className="cartItem__quantity--button
          cartItem__quantity--button-minus h3"
          onClick={() => decreaseQuantityInCart(id)}
        >
          -
        </button>
        {quantity}
        <button
          type="button"
          aria-label="plus-button"
          className="cartItem__quantity--button
          cartItem__quantity--button-plus h3"
          onClick={() => increaseQuantityInCart(id)}
        >
          +
        </button>
      </div>
      <h2 className="cartItem__price h2">
        $
        {product.price - (product.price * product.discount) / 100}
      </h2>
    </div>
  );
};
