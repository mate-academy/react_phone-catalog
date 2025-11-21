/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC } from 'react';
import { CartItem } from '../../../../types/Cart';
import remove from '../../../../assets/images/icons/remove.svg';
import minus from '../../../../assets/images/icons/minus.svg';
import plus from '../../../../assets/images/icons/plus.svg';
import s from './CartItem.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  item: CartItem;
}

export const CartItemBlock: FC<Props> = ({ item }) => {
  return (
    <div className={s.cartItem}>
      <div className={s.infoBlock}>
        <img
          className={s.removeIcon}
          src={remove}
          alt="Remove Item"
          onClick={() => console.log(item.id)}
        />
        <div className={s.imageBlock}>
          <Link to={`/product/${item.product.itemId}`}>
            <img
              className={s.productImage}
              src={item.product.image}
              alt={item.product.name}
              onClick={() => console.log(item.id)}
            />
          </Link>
        </div>
        <div className={s.productName}>
          {' '}
          <Link to={`/product/${item.product.itemId}`}>
            {item.product.name}
          </Link>
        </div>
      </div>
      <div className={s.quantityPriceBlock}>
        <div className={s.quantityBlock}>
          <button
            type="button"
            className={s.quantityButton}
            disabled={item.quantity <= 1}
          >
            <img
              src={minus}
              alt="Decrement"
              onClick={() => console.log(item.id)}
            />
          </button>
          <span>{item.quantity}</span>
          <button type="button" className={s.quantityButton}>
            <img
              src={plus}
              alt="Increment"
              onClick={() => console.log(item.id)}
            />
          </button>
        </div>
        <div className={s.priceBlock}>${item.product.price}</div>
      </div>
    </div>
  );
};
