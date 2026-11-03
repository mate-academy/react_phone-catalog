import classNames from 'classnames/bind';

import type { Product } from '../../../../types/Product';
import { useCart } from '../../../../hooks/useCart';
import styles from './CartItem.module.scss';

const cx = classNames.bind(styles);

type Props = {
  product: Product;
  quantity: number;
};

export const CartItem = ({ product, quantity }: Props) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { itemId, name, image, price } = product;

  return (
    <article className={cx('cart-item')}>
      <button
        type="button"
        className={cx('cart-item__remove')}
        aria-label={`Remove ${name} from cart`}
        onClick={() => removeFromCart(itemId)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 4L12 12M12 4L4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <img className={cx('cart-item__image')} src={`/${image}`} alt={name} />

      <div className={cx('cart-item__title')}>{name}</div>

      <div className={cx('cart-item__counter')}>
        <button
          type="button"
          className={cx('cart-item__counter-button')}
          aria-label="Decrease quantity"
          disabled={quantity === 1}
          onClick={() => decreaseQuantity(itemId)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 8H12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <span className={cx('cart-item__quantity')}>{quantity}</span>

        <button
          type="button"
          className={cx('cart-item__counter-button')}
          aria-label="Increase quantity"
          onClick={() => increaseQuantity(itemId)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 8H12.5M8 3.5V12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className={cx('cart-item__price')}>${price * quantity}</div>
    </article>
  );
};
