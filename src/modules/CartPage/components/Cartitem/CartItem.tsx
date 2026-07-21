import { CartItem as CartItemType } from '../../../shared/types/CartItem';
import { FC } from 'react';
import { useShop } from '../../../../context/ShopContext';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';

const CLOSE_ICON_PATH =
  'M12.4721 4.47138C12.7324 4.21103 12.7324 3.78892 ' +
  '12.4721 3.52858C12.2117 3.26823 11.7896 3.26823 ' +
  '11.5292 3.52858L8.00065 7.05717L4.47206 3.52858C4.21171 ' +
  '3.26823 3.7896 3.26823 3.52925 3.52858C3.2689 3.78892 ' +
  '3.2689 4.21103 3.52925 4.47138L7.05784 7.99998L3.52925 ' +
  '11.5286C3.2689 11.7889 3.2689 12.211 3.52925 12.4714C3.7896 ' +
  '12.7317 4.21171 12.7317 4.47206 12.4714L8.00065 8.94279L11.5292 ' +
  '12.4714C11.7896 12.7317 12.2117 12.7317 12.4721 12.4714C12.7324 ' +
  '12.211 12.7324 11.7889 12.4721 11.5286L8.94346 7.99998L12.4721 ' +
  '4.47138Z';

const MINUS_ICON_PATH =
  'M2.66602 7.99998C2.66602 7.63179 2.96449 7.33331 ' +
  '3.33268 7.33331H12.666C13.0342 7.33331 13.3327 7.63179 ' +
  '13.3327 7.99998C13.3327 8.36817 13.0342 8.66665 12.666 ' +
  '8.66665H3.33268C2.96449 8.66665 2.66602 8.36817 ' +
  '2.66602 7.99998Z';

const PLUS_ICON_PATH =
  'M8.66602 3.33335C8.66602 2.96516 8.36754 2.66669 ' +
  '7.99935 2.66669C7.63116 2.66669 7.33268 2.96516 ' +
  '7.33268 3.33335V7.33335H3.33268C2.96449 7.33335 ' +
  '2.66602 7.63183 2.66602 8.00002C2.66602 8.36821 ' +
  '2.96449 8.66669 3.33268 8.66669H7.33268V12.6667C7.33268 ' +
  '13.0349 7.63116 13.3334 7.99935 13.3334C8.36754 13.3334 ' +
  '8.66602 13.0349 8.66602 12.6667V8.66669H12.666C13.0342 ' +
  '8.66669 13.3327 8.36821 13.3327 8.00002C13.3327 7.63183 ' +
  '13.0342 7.33335 12.666 7.33335H8.66602V3.33335Z';

type Props = {
  cartItem: CartItemType;
};

export const CartItem: FC<Props> = ({ cartItem }) => {
  const { product, quantity } = cartItem;

  const { removeFromCart, increaseQuantity, decreaseQuantity } = useShop();

  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItem__mainContent}>
        <button
          className={styles.cartItem__removeButton}
          type="button"
          aria-label="Remove product from cart"
          onClick={() => removeFromCart(product.id)}
        >
          <svg
            className={styles.cartItem__icon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={CLOSE_ICON_PATH}
              fill="currentColor"
            />
          </svg>
        </button>

        <Link
          className={styles.cartItem__imageLink}
          to={`/product/${product.itemId}`}
        >
          <img
            className={styles.cartItem__image}
            src={product.image}
            alt={product.name}
          />
        </Link>

        <Link
          className={styles.cartItem__titleLink}
          to={`/product/${product.itemId}`}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__counter}>
          <button
            className={styles.cartItem__quantityButton}
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity === 1}
            onClick={() => decreaseQuantity(product.id)}
          >
            <svg
              className={styles.cartItem__icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={MINUS_ICON_PATH}
                fill="currentColor"
              />
            </svg>
          </button>

          <p className={styles.cartItem__quantity}>{quantity}</p>

          <button
            className={styles.cartItem__quantityButton}
            type="button"
            aria-label="Increase quantity"
            onClick={() => increaseQuantity(product.id)}
          >
            <svg
              className={styles.cartItem__icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={PLUS_ICON_PATH}
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <h3 className={styles.cartItem__price}>
          {`$${product.price * quantity}`}
        </h3>
      </div>
    </article>
  );
};
