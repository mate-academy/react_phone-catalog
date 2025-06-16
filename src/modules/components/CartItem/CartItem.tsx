import { Product } from '../../../types/Product';
import remove from '../../../img/icons/cart-button-remove.svg';
import minus from '../../../img/icons/cart-button-minus.svg';
import minusWhite from '../../../img/icons/cart-button-minus-white.svg';
import minusLight from '../../../img/icons/cart-button-minus-light.svg';
import minusBlack from '../../../img/icons/cart-button-minus-black-light.svg';
import plus from '../../../img/icons/cart-button-plus.svg';
import plusBlack from '../../../img/icons/cart-button-plus-black.svg';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';

type CartElement = {
  id: string;
  quantity: number;
};

type Props = {
  product: Product;
  cartItem: CartElement | undefined;
  isLightMode: boolean;
  removeFromCart: (id: string) => void;
  increaseCount: (id: string) => void;
  decreaseCount: (id: string) => void;
};

export const CartItem: React.FC<Props> = ({
  product,
  cartItem,
  isLightMode,
  removeFromCart,
  increaseCount,
  decreaseCount,
}) => {
  return (
    <div className={styles.cart__item}>
      <div className={styles.cart__item__top}>
        <button
          className={styles.cart__item__button}
          onClick={() => removeFromCart(product.id.toString())}
        >
          <img
            className={styles['cart__item__button--image']}
            src={remove}
            alt="Cart-remove-button"
          />
        </button>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.cart__item__product}
        >
          <img
            className={styles['cart__item__product--image']}
            src={product.image}
            alt={`Product-image-${product.id}`}
          />
        </Link>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.cart__item__text}
        >
          {product.name}
        </Link>
      </div>
      <div className={styles.cart__item__bootom}>
        <div className={styles.cart__item__actions}>
          <button
            className={`${styles.cart__item__button} ${styles['cart__item__actions--button']} ${cartItem?.quantity === 1 ? styles['cart__item__button--disabled'] : ''}`}
            onClick={() => decreaseCount(product.id.toString())}
            disabled={cartItem?.quantity === 1}
          >
            <img
              className={styles['cart__item__button--image']}
              src={
                !isLightMode
                  ? cartItem?.quantity > 1
                    ? minusWhite
                    : minus
                  : cartItem?.quantity > 1
                    ? minusBlack
                    : minusLight
              }
              alt="Cart-minus-button"
            />
          </button>
          <span className={styles['cart__item__actions--text']}>
            {cartItem?.quantity}
          </span>
          <button
            className={`${styles.cart__item__button} ${styles['cart__item__actions--button']}`}
            onClick={() => increaseCount(product.id.toString())}
          >
            <img
              className={styles['cart__item__button--image']}
              src={!isLightMode ? plus : plusBlack}
              alt="Cart-plus-button"
            />
          </button>
        </div>
        <span className={styles.cart__item__price}>${product.price}</span>
      </div>
    </div>
  );
};
