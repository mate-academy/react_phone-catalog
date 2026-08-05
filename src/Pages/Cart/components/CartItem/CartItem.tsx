// CartItem.tsx
import styles from './CartItem.module.scss';
import { useCart } from '../../../../context/CartContext'; // Запуши шлях до свого контексту
import type { Product } from '../../../../types/Product';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export const CartItem = ({ product, quantity }: CartItemProps) => {
  // Дістаємо готові функції з контексту
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // Рахуємо підсумкову ціну для даної кількості товарів
  const totalPrice = product.price * quantity;

  return (
    <article className={styles.wraper}>
      <div className={styles.info}>
        {/* Кнопка видалення (хрестик) */}
        <button
          type="button"
          className={styles.btn}
          onClick={() => removeFromCart(product.itemId)}
        >
          <img
            src="/icons/close-gray.svg"
            alt="Icon close"
            className={styles.iconImage}
          />
        </button>

        <img src={product.image} alt="Product photo" className={styles.image} />
        <h3 className={styles.name}>{product.name}</h3>
      </div>

      <div className={styles.blockPrice}>
        <div className={styles.count}>
          {/* Зменшити кількість (-) */}
          <span className={styles.countIcon}>
            <img
              src="/icons/minus.svg"
              alt="Icon minus"
              className={`${styles.iconImage} ${styles.minus}`}
              onClick={() => decreaseQuantity(product.itemId)}
            />
          </span>

          {/* Відображаємо кількість із пропса */}
          <span className={styles.countNumber}>{quantity}</span>

          {/* Збільшити кількість (+) */}
          <span className={`${styles.countIcon} ${styles.black}`}>
            <img
              src="/icons/plus.svg"
              alt="Icon plus"
              className={styles.iconImage}
              onClick={() => increaseQuantity(product.itemId)}
            />
          </span>
        </div>

        {/* Загальна вартість для цієї позиції */}
        <p className={styles.price}>${totalPrice}</p>
      </div>
    </article>
  );
};
