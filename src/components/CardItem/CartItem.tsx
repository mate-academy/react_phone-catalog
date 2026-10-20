import styles from './CartItem.module.scss';
import type { ProductDetails } from '../../types';
import { useCart } from '../../hooks';
import { Link } from 'react-router-dom';

type CartItemProps = {
  product: ProductDetails;
};

export const CartItem = ({ product }: CartItemProps) => {
  const { removeFromCart, cartQuantities, increaseQuantity, decreaseQuantity } =
    useCart();

  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItem__product}>
        <button onClick={() => removeFromCart(product.id)}>
          <img src="./icons/Close.svg" alt="Remove product" />
        </button>

        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} />
        </Link>

        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </div>

      <div className={styles.cartItem__purchase}>
        <div className={styles.cartItem__quantity}>
          <button
            onClick={() => {
              decreaseQuantity(product.id);
            }}
            disabled={(cartQuantities[product.id] || 1) === 1}
          >
            <img src="./icons/Minus.svg" alt="Decrease quantity" />
          </button>

          <div className={styles['cartItem__quantity--value']}>
            <span>{cartQuantities[product.id] || 1}</span>
          </div>

          <button onClick={() => increaseQuantity(product.id)}>
            <img src="./icons/Plus.svg" alt="Increase quantity" />
          </button>
        </div>

        <p className={styles.cartItem__price}>${product.priceDiscount}</p>
      </div>
    </article>
  );
};
