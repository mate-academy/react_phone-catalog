/* eslint-disable jsx-a11y/control-has-associated-label */
import { useAppDispatch } from '../../app/hooks';
import {
  CartItemType,
  decreaseQuantity,
  increaseQuantity,
  remove,
} from '../../features/cart/cartSlice';
import { calculateDiscount } from '../../utils/calculateDiscount';
import { Button } from '../Button/Button';
import './CartItem.scss';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const { id, imageUrl, name } = item.product;

  return (
    <div className="CartItem">
      <button
        className="CartItem__delete"
        type="button"
        data-cy="cartDeleteButton"
        onClick={() => dispatch(remove(id))}
      />

      <div className="CartItem__image">
        <img
          src={imageUrl}
          alt={name}
        />
      </div>

      <div className="CartItem__title">
        {name}
      </div>

      <div className="CartItem__quantity">
        <Button
          content="quantity"
          sign="minus"
          disabled={item.quantity === 1}
          onClick={() => dispatch(decreaseQuantity(id))}
        />

        <span
          data-cy="productQuantity"
        >
          {item.quantity}
        </span>

        <Button
          content="quantity"
          sign="plus"
          onClick={() => dispatch(increaseQuantity(id))}
        />
      </div>

      <div className="CartItem__price">
        <h2>
          {`$${calculateDiscount(item.product)}`}
        </h2>
      </div>
    </div>
  );
};
