import React from 'react';
import style from './CartItem.module.scss';
import { CartItemType } from '../../../types/Types';
import { useCart } from '../../../context/CartContext';
import { Icon } from '../../../components/ui/Icon/Icon';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { search } = useLocation();
  const { removeItemCart, updateQuantity } = useCart();

  const handleIncrease = () => updateQuantity(item.id, item.quantity + 1);
  const handleDecrease = () => updateQuantity(item.id, item.quantity - 1);

  return (
    <article className={style.cartItem}>
      <div className={style.cartItem__info}>
        <button
          className={style.cartItem__buttonClose}
          onClick={() => removeItemCart(item.id)}
        >
          <Icon className={style.cartItem__icon} nameIcon="close" />
        </button>

        <Link
          className={style.cartItem__imgLink}
          to={{ pathname: `/product/${item.product.itemId}`, search: search }}
        >
          <img
            className={style.cartItem__img}
            src={item.product.image}
            alt={item.product.name}
          />
        </Link>

        <Link
          className={style.cartItem__name}
          to={{ pathname: `/product/${item.product.itemId}`, search: search }}
        >
          {item.product.name}
        </Link>
      </div>

      <div className={style.cartItem__action}>
        <div className={style.cartItem__control}>
          <button
            onClick={handleDecrease}
            className={style.cartItem__buttonQuantity}
            disabled={item.quantity === 1}
          >
            <Icon
              className={classNames(style.cartItem__icon, {
                [style['cartItem__icon--disabled']]: item.quantity === 1,
              })}
              nameIcon="minus"
            />
          </button>

          <span className={style.cartItem__quantity}>{item.quantity}</span>

          <button
            className={style.cartItem__buttonQuantity}
            onClick={handleIncrease}
          >
            <Icon className={style.cartItem__icon} nameIcon="plus" />
          </button>
        </div>
        <span
          className={style.cartItem__price}
        >{`$ ${item.product.price}`}</span>
      </div>
    </article>
  );
};
