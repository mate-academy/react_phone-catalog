import React from 'react';

import style from './Cart.module.scss';
import { CartProductType } from '../../types/CartProductType';
import { CloseIcon } from '../Icons/CloseIcon';
import { Link } from 'react-router-dom';
import { ChangeQttButton } from '../ChangeQttButton/ChangeQttButton';
import { LessDisabledIcon } from '../Icons/LessDisabledIcon';
import { LessIcon } from '../Icons/LessIcon';
import { PlusIcon } from '../Icons/PlusIcon';

interface Props {
  product: CartProductType;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemove: () => void;
}

export const Cart: React.FC<Props> = ({
  product,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
}) => {
  return (
    <div className={style.cart}>
      <div className={style.cart__content}>
        <button className={style.cart__content_close} onClick={onRemove}>
          <CloseIcon />
        </button>

        <Link
          to={`/product/${product.itemId}`}
          className={style.cart__content_image}
        >
          <img
            src={product.image}
            alt={product.name}
            className={style.cart__content_image_img}
          />
        </Link>

        <Link
          to={`/product/${product.itemId}`}
          className={style.cart__content_title}
        >
          {product.name}
        </Link>
      </div>

      <div className={style.cart__button}>
        <div className={style.cart__button_counter}>
          <ChangeQttButton
            onClick={onDecreaseQuantity}
            disabled={product.quantity === 1}
          >
            {product.quantity === 1 ? <LessDisabledIcon /> : <LessIcon />}
          </ChangeQttButton>

          <span className={style.cart__button_count}>{product.quantity}</span>

          <ChangeQttButton onClick={onIncreaseQuantity}>
            {<PlusIcon />}
          </ChangeQttButton>
        </div>

        <h3 className={style.cart__price}>
          ${product.price * product.quantity}
        </h3>
      </div>
    </div>
  );
};
