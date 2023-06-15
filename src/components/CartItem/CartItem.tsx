import './CartItem.scss';

import classNames from 'classnames';
import { useAppDispatch } from '../../helpers/hooks';
import * as cartActions from '../../features/cart';
import { Item } from '../../types/Item';

type Props = {
  item: Item;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const removeItemFromCart = ((itemId: string) => (
    dispatch(cartActions.remove(itemId))
  ));

  const increaseCartItems = ((itemId: string) => (
    dispatch(cartActions.increase(itemId))
  ));

  const decreaseCartItems = ((itemId: string) => (
    dispatch(cartActions.decrease(itemId))
  ));

  return (
    <li className="cart-item">
      <button
        aria-label="delete"
        type="button"
        className="
          cart-item__button
          button-square
          button-square--close
        "
        onClick={() => removeItemFromCart(item.id)}
        data-cy="cartDeleteButton"
      />

      <div className="cart-item__image-container">
        <img
          src={`${item.imageURL}`}
          alt={item.name}
          className="cart-item__image"
        />
      </div>

      <p className="cart-item__name">
        {item.name}
      </p>

      <div className="cart-item__actions">
        <button
          type="button"
          className={classNames(
            'cart-item__button',
            'button-square',
            {
              'button-square--disabled': item.quantity === 1,
            },
          )}
          onClick={() => decreaseCartItems(item.id)}
        >
          <img
            src="img/icons/minus.svg"
            alt="minus"
          />
        </button>

        <span className="cart-item__count">
          {item.quantity}
        </span>

        <button
          type="button"
          className="
            cart-item__button
            button-square
          "
          onClick={() => increaseCartItems(item.id)}
        >
          <img
            src="img/icons/plus.svg"
            alt="plus"
          />
        </button>
      </div>

      <div className="cart-item__price">
        {`$${item.quantity * item.price}`}
      </div>
    </li>
  );
};
