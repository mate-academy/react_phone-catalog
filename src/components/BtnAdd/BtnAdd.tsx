//..  BtnAdd.tsx;
import styles from './BtnAdd.module.scss';
import { useCart } from '../../context/CartContext';

interface BtnAddProps {
  productId?: string; // Опціональний: потрібен лише для корзини
  children?: React.ReactNode; // Текст кнопки (наприклад, "Checkout")
  onClick?: () => void; // Власний клік для довільних дій
  className?: string; // Для додаткових класів ззовні
}

export const BtnAdd = ({
  productId,
  children,
  onClick,
  className = '',
}: BtnAddProps) => {
  const { toggleCart, isInCart } = useCart();

  // 🛍 ВАРІАНТ 1: Якщо передано productId — працює автоматично з CartContext
  if (productId) {
    const active = isInCart(productId);

    return active ? (
      <button
        type="button"
        onClick={() => toggleCart(productId)}
        className={`${styles.btnAdd} ${styles.isActive} ${className}`}
      >
        Added to cart
      </button>
    ) : (
      <button
        type="button"
        onClick={() => toggleCart(productId)}
        className={`${styles.btnAdd} ${className}`}
      >
        Add to cart
      </button>
    );
  }

  //  ВАРІАНТ 2: Якщо productId НЕМАЄ — працює як звичайна кнопка (Checkout тощо)
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.btnAdd} ${className}`}
    >
      {children || 'Button'}
    </button>
  );
};
