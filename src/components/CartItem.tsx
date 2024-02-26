import classNames from 'classnames';
import {
  FC, useContext, useEffect, useState,
} from 'react';
import { Context } from '../contexts/Context';
import { CartProduct } from '../types/CartProduct';

type Props = {
  cartItem: CartProduct;
};

export const CartItem: FC<Props> = ({
  cartItem,
}) => {
  const [count, setCount] = useState(+cartItem.count);

  const {
    updateCount,
    deleteItem,
  } = useContext(Context);

  useEffect(() => {
    updateCount(cartItem.item.id, count);
  }, [count]);

  const addCount = () => {
    setCount(count + 1);
  };

  const removeCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="cart__item">
      <button
        type="button"
        data-cy="cartDeleteButton"
        className="cart__item-delete-btn"
        onClick={() => deleteItem(cartItem.item.id)}
      >
        x
      </button>
      <img
        src={cartItem.item.imageUrl}
        alt="#"
        className="cart__item-image"
      />
      <h2 className="cart__item-title">{cartItem.item.name}</h2>
      <div className="cart__item-counter">
        <button
          type="button"
          className={classNames('cart__item-count-btn', {
            'cart__item-count-btn--active': count > 1,
          })}
          onClick={() => removeCount()}
        >
          -
        </button>
        {count}
        <button
          type="button"
          className="cart__item-count-btn cart__item-count-btn--active"
          onClick={() => addCount()}
        >
          +
        </button>
        <p className="cart__item-price">
          {`$${((cartItem.item.price - ((cartItem.item.price / 100) * cartItem.item.discount)) * count)}`}
        </p>
      </div>
    </div>
  );
};
