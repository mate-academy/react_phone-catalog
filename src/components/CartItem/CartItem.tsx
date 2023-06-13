import './CartItem.scss';

import classNames from 'classnames';
import { useState } from 'react';
import { Product } from '../../types/Product';

type Props = {
  item: Product;
  removeProductFromCart: (id: string) => void;
};

export const CartItem: React.FC<Props> = ({
  item,
  removeProductFromCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <li className="cart-item">
      <button
        type="button"
        className="
          cart-item__button
          button-square
          button-square--close
        "
        onClick={() => removeProductFromCart(item.phoneId)}
      >
        <img
          src="img/icons/close.svg"
          alt="close"
        />
      </button>

      <div className="cart-item__image-container">
        <img
          src={`${item.image}`}
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
              'button-square--disabled': quantity === 1,
            },
          )}
          onClick={() => {
            setQuantity(prevCount => prevCount - 1);
          }}
        >
          <img
            src="img/icons/minus.svg"
            alt="minus"
          />
        </button>

        <span className="cart-item__count">
          {quantity}
        </span>

        <button
          type="button"
          className="
            cart-item__button
            button-square
          "
          onClick={() => {
            setQuantity(prevCount => prevCount + 1);
          }}
        >
          <img
            src="img/icons/plus.svg"
            alt="plus"
          />
        </button>
      </div>

      <div className="cart-item__price">
        {`$${quantity * item.price}`}
      </div>
    </li>
  );
};
