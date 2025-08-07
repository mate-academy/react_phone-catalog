import { useEffect, useState } from 'react';
import { ProductDemo } from '../../types/ProductDemo';
import styles from './CartItem.module.scss';

type OrderCardProps = {
  product: ProductDemo;
  setQuantityChanged?: React.Dispatch<React.SetStateAction<boolean>>;
};

const getStoredItem = (itemId: string): ProductDemo | null => {
  const json = localStorage.getItem(`cart_${itemId}`);

  return json ? JSON.parse(json) : null;
};

const setStoredItem = (item: ProductDemo) => {
  localStorage.setItem(`cart_${item.itemId}`, JSON.stringify(item));
};

const removeStoredItem = (itemId: string) => {
  localStorage.removeItem(`cart_${itemId}`);
};

export const CartItem: React.FC<OrderCardProps> = ({
  product,
  setQuantityChanged,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const storedItem = getStoredItem(product.itemId);

    if (storedItem?.quantity) {
      setQuantity(storedItem.quantity);
    }
  }, [product.itemId]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeStoredItem(product.itemId);
    } else {
      setStoredItem({ ...product, quantity: newQuantity });
    }

    setQuantity(newQuantity);
    setQuantityChanged?.(prev => !prev);
  };

  const increment = () => handleQuantityChange(quantity + 1);

  const decrement = () => handleQuantityChange(quantity - 1);

  const deleteOrder = () => {
    removeStoredItem(product.itemId);
    setQuantityChanged?.(prev => !prev);
  };

  return (
    <div className={styles.embla__slide}>
      <li className={styles.card}>
        <div className={styles.item}>
          <button className={styles.item_close} onClick={deleteOrder}>
            <img src="img/Additional images/icons/gray cross.svg" alt="close" />
          </button>
          <img
            className={styles.item_image}
            src={product.image}
            alt={product.name}
          />
          <span className={styles.item_name}>{product.name}</span>
        </div>

        <div className={styles.orderInfo}>
          <div className={styles.orderInfo_quantity}>
            <button className={styles.orderInfo_button} onClick={decrement}>
              <img src="img/Buttons/Icons/white minus.svg" alt="minus" />
            </button>

            <span>{quantity}</span>

            <button className={styles.orderInfo_button} onClick={increment}>
              <img src="img/Buttons/Icons/white plus.svg" alt="plus" />
            </button>
          </div>

          <span className={styles.orderInfo_price}>${product.price}</span>
        </div>
      </li>
    </div>
  );
};
