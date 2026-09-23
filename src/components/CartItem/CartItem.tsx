import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types/CartItem';
import { useStore } from '../../context/StoreContext';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, updateQuantity } = useStore();
  const { product, quantity } = item;

  return (
    <div className={styles['cart-item']} data-cy="cartItem">
      <div className={styles['cart-item__main']}>
        <button
          className={styles['cart-item__remove']}
          onClick={() => removeFromCart(product.id)}
          aria-label="Remove item"
          data-cy="cartDelete"
        >
          <i className="fas fa-times"></i>
        </button>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles['cart-item__image-link']}
        >
          <img
            src={product.image}
            alt={product.name}
            className={styles['cart-item__image']}
          />
        </Link>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles['cart-item__title']}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles['cart-item__actions']}>
        <div className={styles['cart-item__quantity']}>
          <button
            className={styles['cart-item__btn']}
            onClick={() => updateQuantity(product.id, -1)}
            disabled={quantity <= 1}
          >
            <i className="fas fa-minus"></i>
          </button>

          <span
            className={styles['cart-item__count']}
            data-cy="productQuantity"
          >
            {quantity}
          </span>

          <button
            className={styles['cart-item__btn']}
            onClick={() => updateQuantity(product.id, 1)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <span className={styles['cart-item__price']}>
          ${product.price * quantity}
        </span>
      </div>
    </div>
  );
};
