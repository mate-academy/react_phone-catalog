import { ShortProduct, Product } from '../../../shared/models';
import styles from './Counter.module.scss';
import PlusIcon from '../../../assets/icons/plus.svg?react';
import { useCart } from '../../../shared/context/CartContext';

interface Props {
  quantity: number;
  product: Product | ShortProduct;
}

export const Counter = ({ quantity, product }: Props) => {
  const { updateQuantity } = useCart();

  const getProductId = (product: Product | ShortProduct): string => {
    return 'itemId' in product ? product.itemId : product.id;
  };

  const addItem = () => {
    updateQuantity(getProductId(product), quantity + 1);
  };

  const removeItem = () => {
    if (quantity === 1) return;
    updateQuantity(getProductId(product), quantity - 1);
  };

  return (
    <div className={styles.counter}>
      <button
        onClick={removeItem}
        className={`${styles.counter__block} ${styles.counter__btn}`}
        disabled={quantity === 1}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.66602 7.99998C2.66602 7.63179 2.96449 7.33331 3.33268 7.33331H12.666C13.0342 7.33331 13.3327 7.63179 13.3327 7.99998C13.3327 8.36817 13.0342 8.66665 12.666 8.66665H3.33268C2.96449 8.66665 2.66602 8.36817 2.66602 7.99998Z"
            fill="#4A4D58"
          />
        </svg>
      </button>
      <div className={`${styles.counter__block}`}>{quantity}</div>
      <div
        onClick={addItem}
        className={`${styles.counter__block} ${styles.counter__btn}`}
      >
        <PlusIcon />
      </div>
    </div>
  );
};
