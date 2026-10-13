import { Link } from 'react-router-dom';
import {
  useShopContext,
  CartItem as CartItemType,
} from '../../context/ShopContext';
import styles from './CartItem.module.scss';
import React from 'react';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, changeQuantity } = useShopContext();
  const { product, quantity } = item;

  // 1. ФИКС КАРТИНКИ: берем первую фотку из массива images
  const imagePath =
    product.images && product.images.length > 0 ? product.images[0] : '';

  // 2. ФИКС ЦЕНЫ: используем priceDiscount, так как поля price не существует
  const price = product.priceDiscount || 0;

  return (
    <div className={styles.cartItem}>
      <div className={styles.left}>
        <button
          className={styles.removeBtn}
          onClick={() => removeFromCart(product.id)}
          aria-label="Remove item"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12"
              stroke="var(--c-icons)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 4L12 12"
              stroke="var(--c-icons)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Link
          to={`/${product.category}/${product.id}`}
          className={styles.imageLink}
        >
          {/* Убран ведущий слеш для корректной работы относительных путей на GitHub Pages */}
          <img src={imagePath} alt={product.name} className={styles.image} />
        </Link>

        <Link
          to={`/${product.category}/${product.id}`}
          className={styles.title}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles.right}>
        <div className={styles.quantityControls}>
          <button
            className={styles.qtyBtn}
            disabled={quantity <= 1}
            onClick={() => changeQuantity(product.id, quantity - 1)}
          >
            -
          </button>
          <span className={styles.qtyValue}>{quantity}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => changeQuantity(product.id, quantity + 1)}
          >
            +
          </button>
        </div>
        {/* Выводим актуальную цену */}
        <span className={styles.price}>${price}</span>
      </div>
    </div>
  );
};
