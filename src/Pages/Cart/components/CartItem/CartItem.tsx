// CartItem.tsx
import styles from './CartItem.module.scss';
import { useCart } from '../../../../context/CartContext'; // Запуши шлях до свого контексту
import type { Product } from '../../../../types/Product';

import plus from '/icons/plus.svg';
import minus from '/icons/minus.svg';
import close from '/icons/close.svg';

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
          <img src={close} alt="Icon close" className={styles.iconImage} />
        </button>

        <img src={product.image} alt="Product photo" className={styles.image} />
        <h3 className={styles.name}>{product.name}</h3>
      </div>

      <div className={styles.blockPrice}>
        <div className={styles.count}>
          {/* Зменшити кількість (-) */}
          <span
            onClick={() => decreaseQuantity(product.itemId)}
            className={styles.countIcon}
          >
            <img
              src={minus}
              alt="Icon minus"
              className={`${styles.iconImage} ${styles.minus}`}
            />
          </span>

          {/* Відображаємо кількість із пропса */}
          <span className={styles.countNumber}>{quantity}</span>

          {/* Збільшити кількість (+) */}
          <span
            onClick={() => increaseQuantity(product.itemId)}
            className={`${styles.countIcon} ${styles.black}`}
          >
            <img src={plus} alt="Icon plus" className={styles.iconImage} />
          </span>
        </div>

        {/* Загальна вартість для цієї позиції */}
        <p className={styles.price}>${totalPrice}</p>
      </div>
    </article>
  );
};
