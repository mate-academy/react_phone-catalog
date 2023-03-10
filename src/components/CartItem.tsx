// eslint-disable-next-line object-curly-newline
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ProductInCart } from '../types/ProductInCart';

type Props = {
  product: ProductInCart;
};

export const CartItem: FC<Props> = ({ product }) => {
  const { handleToggleAddToCart, updateCount } = useAppContext();

  const [count, setCount] = useState(product.count);

  useEffect(() => {
    updateCount(count, product.itemId);
  }, [count, product.itemId]);

  return (
    <div>
      <div className="cart-item">
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => handleToggleAddToCart(product)}
        >
          ✕
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="cart-item__img"
        />
        <p className="cart-item__name">{product.name}</p>
        <div className="cart-item__actions">
          <button
            type="button"
            className={classNames('cart-item__change-count-btn', {
              'cart-item__change-count-btn--disabled': count === 1,
            })}
            onClick={() => setCount(count - 1)}
          >
            −
          </button>
          <div className="cart-item__count">{count}</div>
          <button
            type="button"
            className="cart-item__change-count-btn"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
        <p className="cart-item__total-price-product">{product.price}</p>
      </div>
    </div>
  );
};
