import styles from './CartItem.module.scss';
import type { ProductDetails } from '../../types';
// import { useCart } from '../../hooks';

type CartItemProps = {
  product: ProductDetails;
};

export const CartItem = ({ product }: CartItemProps) => {
  // const { removeFromCart } = useCart();

  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItem__product}>
        <button>
          <img src="./icons/Close.svg" alt="Remove product" />
        </button>

        <img src={product.images[0]} alt={product.name} />

        <p>{product.name}</p>
      </div>

      <div className={styles.cartItem__purchase}>
        <div className={styles.cartItem__quantity}>
          <button>
            <img src="./icons/Minus.svg" alt="Decrease quantity" />
          </button>

          <span>1</span>

          <button>
            <img src="./icons/Plus.svg" alt="Increase quantity" />
          </button>
        </div>

        <p className={styles.cartItem__price}>${product.priceDiscount}</p>
      </div>
    </article>
  );
};
