import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductInCart } from '../../../types/ProductInCart';
import { useAppContext } from '../../../context/AppContext';
import './CartItem.scss';

type Props = {
  product: ProductInCart;
};

export const CartItem: FC<Props> = ({ product }) => {
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
          <img src="./img/svg/Close.svg" alt="Close" />
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
            className={classNames('button__small button__small--left', {
              'button__small--disabled': count === 1,
            })}
            onClick={handleArrowLeft}
            disabled={count === 1}
          />
          <div className="cart-item__count">{count}</div>
          <button
            type="button"
            className="button__small"
            onClick={handleArrowRight}
          />
        </div>
        <p className="cart-item__total-price-product">{`$${product.price * count}`}</p>
      </div>
    </>
  );
};
