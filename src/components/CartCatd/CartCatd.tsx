import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { StorContext } from '../../context/StorContext';
import { CartDetale } from '../../types/CartDetale';
import './CartCatd.scss';

type Props = {
  product: CartDetale;
};

export const CartCard: React.FC<Props> = ({ product }) => {
  const { handleToggleAddToCart, updateCount } = useContext(StorContext);
  const [count, setCount] = useState(product.quantity);
  const addToCart = () => handleToggleAddToCart(product);

  useEffect(() => {
    updateCount(count, product.itemId);
  }, [count, product.itemId, updateCount]);

  return (
    <div>
      <div className="cart-card" data-cy="cartDeleteButton">
        <button
          type="button"
          className="cart-card__remove"
          onClick={addToCart}
        >
          <img src="img/mine/icons/Close.svg" alt="close" />
        </button>

        <img
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${product.image}`}
          alt={product.name}
          className="cart-card__img"
        />

        <p className="cart-card__name">{product.name}</p>

        <div className="cart-card__actions">
          <button
            type="button"
            className={classNames(
              'cart-card__btn',
              { 'cart-card__btn--disabled': count === 1 },
            )}
            disabled={count === 1}
            onClick={() => setCount(count - 1)}
          >
            <img src="img/mine/icons/Minus.svg" alt="minus" />
          </button>

          <div className="cart-card__count">{count}</div>

          <button
            type="button"
            className="cart-card__btn"
            onClick={() => setCount(count + 1)}
          >
            <img src="img/mine/icons/Plus.svg" alt="plus" />
          </button>
        </div>
        <p className="cart-card__price">
          $
          {product.price}
        </p>
      </div>
    </div>
  );
};
