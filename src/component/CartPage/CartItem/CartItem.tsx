import { useContext } from 'react';
import { CartProduct } from './../../../types/Products';
import style from './CartItem.module.scss';
import { DispatchContext } from './../../../hooks/SelectionState';

import Minus from './../../../../public/icon/Minus.png';
import Plus from './../../../../public/icon/Plus.png';
import Close from './../../../../public/icon/Union.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface CartItemProps {
  product: CartProduct;
}

export const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useContext(DispatchContext);

  const { quantity } = product;
  const { name, image, price, itemId, category } = product.product;

  const handleRemoveItem = () => {
    dispatch({ type: 'removeCart', payload: itemId });
  };

  const increaseQuantity = () => {
    dispatch({ type: 'addQuantityToCart', payload: itemId });
  };

  const decreaseQuantity = () => {
    dispatch({ type: 'reduceTheQuantityInTheCart', payload: itemId });
  };

  const path = `/${category}/${itemId}`;

  return (
    <div className={style['cart-item']}>
      <div className={style['cart-item__container']}>
        <button
          className={style['cart-item__button-delete']}
          onClick={handleRemoveItem}
        >
          <img src={Close} alt="Delete" className={style['cart-item__close']} />
        </button>

        <img src={image} alt={name} className={style['cart-item__image']} />
        <Link to={path} className={style['cart-item__link']}>
          {name}
        </Link>
      </div>
      <div className={style['cart-item__container--info']}>
        <div className={style['cart-item__count']}>
          <button
            className={classNames(
              style['cart-item__button'],
              style['cart-item__button--minus'],
            )}
            onClick={decreaseQuantity}
            disabled={quantity === 1}
          >
            <img src={Minus} className={style['cart-item__image--count']} />
          </button>
          <p className={style['cart-item__quantity']}>{quantity}</p>
          <button
            className={classNames(
              style['cart-item__button'],
              style['cart-item__button--plus'],
            )}
            onClick={increaseQuantity}
          >
            <img src={Plus} className={style['cart-item__image--count']} />
          </button>
        </div>
        <p className={style['cart-item__price']}>${price * quantity}</p>
      </div>
    </div>
  );
};
