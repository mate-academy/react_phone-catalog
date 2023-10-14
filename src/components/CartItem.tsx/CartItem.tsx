import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ProductInCart } from '../../types/ProductInCart';
import close from '../../assets/svg/close.svg';
import plus from '../../assets/svg/plus.svg';
import minus from '../../assets/svg/minus.svg';

import './cart-item.scss';

type Props = {
  product: ProductInCart;
};

export const CartItem: FC<Props> = ({ product }) => {
  const { handleToggleAddToCart, updateCount } = useAppContext();
  const [count, setCount] = useState(product.count);
  const addToCart = () => handleToggleAddToCart(product);

  useEffect(() => {
    updateCount(count, product.itemId);
  }, [count, product.itemId]);

  return (
    <div>
      <div className="cart-item" data-cy="cartDeleteButton">
        <button
          type="button"
          className="cart-item__remove"
          onClick={addToCart}
        >
          <img src={close} alt="close" />
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
            className={classNames(
              'cart-item__change-count-btn',
              'button-square',
              {
                'button-square--disabled': count === 1,
              },
            )}
            onClick={() => setCount(count - 1)}
          >
            <img src={minus} alt="minus" />
          </button>
          <div className="cart-item__count">{count}</div>
          <button
            type="button"
            className="cart-item__change-count-btn button-square"
            onClick={() => setCount(count + 1)}
          >
            <img src={plus} alt="plus" />
          </button>
        </div>
        <p className="cart-item__total-price-product">{product.price}</p>
      </div>
    </div>
  );
};
