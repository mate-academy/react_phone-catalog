import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductInCart } from '../../types/ProductInCart';
import { useAppContext } from '../../context/AppContext';
import close from '../../assets/svg/close.svg';
import arrowLeft from '../../assets/svg/arrowLeft.svg';
import arrowRight from '../../assets/svg/arrowRight.svg';

import './cartItem.scss';

type Props = {
  product: ProductInCart,
};

export const CartItem: FC<Props> = ({
  product,
}) => {
  const { handleToggleAddToCart, updateCount } = useAppContext();
  const [count, setCount] = useState(product.count);

  const handleAddCart = () => handleToggleAddToCart(product);
  const handleArrowLeft = () => setCount(count - 1);
  const handleArrowRight = () => setCount(count + 1);

  useEffect(() => {
    updateCount(count, product.itemId);
  }, [count, product.itemId]);

  return (
    <>
      <div className="cart-item">
        <button
          type="button"
          className="cart-item__remove"
          onClick={handleAddCart}
        >
          <img src={close} alt="Close" />
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
              'cart-item_change-count-btn',
              'button-square',
              { 'button-square--disabled': count === 1 },
            )}
            onClick={handleArrowLeft}
          >
            <img src={arrowLeft} alt="Arrow Left" />
          </button>
          <div className="cart-item__count">{count}</div>
          <button
            type="button"
            className="cart-item_change-count-btn button-square"
            onClick={handleArrowRight}
          >
            <img src={arrowRight} alt="Arrow Right" />
          </button>
        </div>
        <p className="cart-item__total-price-product">{`$${product.price * count}`}</p>
      </div>
    </>
  );
};
