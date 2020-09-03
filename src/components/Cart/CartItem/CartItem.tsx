import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import './CartItem.scss';
import {
  AllAction, decreaseCount, deleteCart, increaseCount,
} from '../../../store/cartStore/cartStore';

type Props = {
  id: string;
  imgUrl: string;
  name: string;
  count: number | undefined;
  price: number;
  discount: number;
};

const CartItem: React.FC<Props> = ({
  imgUrl, name, count, price, discount, id,
}) => {
  const dispatch = useDispatch<Dispatch<AllAction>>();

  return (
    <div className="cart_item">
      <button
        type="button"
        className="cart_item__button cart_item__clear"
        onClick={() => dispatch(deleteCart(id))}
      >
        <img
          src="./img/icons/Cart/Close.png"
          alt="close"
        />
      </button>
      <img
        src={imgUrl}
        alt={name}
        className="cart_item__picture"
      />
      <h2 className="cart_item__title">
        {name}
      </h2>
      <div className="cart_item__increase-decrease-wrapper">
        <button
          type="button"
          className={cn(
            'cart_item__button cart_item__increase-decrease',
            { cart_item__disabled_button: (count || 0) <= 1 },
          )}
          onClick={() => dispatch(decreaseCount(id))}
          disabled={(count || 0) <= 1}
        >
          <img
            src="./img/icons/Cart/minus.png"
            alt="minus"
          />
        </button>
        <div className="cart_item__count">
          {count}
        </div>
        <button
          type="button"
          className="cart_item__button cart_item__increase-decrease"
          onClick={() => dispatch(increaseCount(id))}
        >
          <img
            src="./img/icons/Cart/Plus.png"
            alt="plus"
          />
        </button>
      </div>
      <div className="cart_item__price">
        {`$${price - (price * (discount / 100))}`}
      </div>
    </div>
  );
};

export default CartItem;
