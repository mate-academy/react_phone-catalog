import { useEffect, useState } from 'react';
import { ProductDemo } from '../../types/ProductDemo';
import styles from './CartItem.module.scss';

type OrderCardProps = {
  product: ProductDemo;
};

export const CartItem: React.FC<OrderCardProps> = ({ product }) => {
  const [currentItem, setCurrentItem] = useState<ProductDemo | null>(null);

  useEffect(() => {
    const currentItemJson = localStorage.getItem(`cart_${product.itemId}`);

    if (currentItemJson) {
      setCurrentItem(JSON.parse(currentItemJson));
    }
  }, [product]);

  const quantity = currentItem?.quantity || 1;

  const setQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      localStorage.removeItem(`cart_${product.itemId}`);

      return;
    }

    const updatedItem = { ...product, quantity: newQuantity };

    localStorage.removeItem(`cart_${product.itemId}`);
    localStorage.setItem(
      `cart_${updatedItem.itemId}`,
      JSON.stringify(updatedItem),
    );

    setCurrentItem(updatedItem);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  const deleteItem = () => {
    localStorage.removeItem(`cart_${product.itemId}`);
    setCurrentItem(null);
  };

  return (
    <div className={styles.embla__slide}>
      <li className={styles.card}>
        <div className={styles.item}>
          <button className={styles.item_close} onClick={deleteItem}>
            <img src="img/Additional images/icons/gray cross.svg" alt="close" />
          </button>
          <img
            className={styles.item_image}
            src={`${product.image}`}
            alt="item"
          />
          <span className={styles.item_name}>{product.name}</span>
        </div>

        <div className={styles.orderInfo}>
          <div className={styles.orderInfo_quantity}>
            <button
              className={styles.orderInfo_button}
              onClick={() => {
                if (quantity === 1) {
                  deleteItem();
                } else {
                  decreaseQuantity();
                }
              }}
            >
              <img src="img/Buttons/Icons/white minus.svg" alt="" />
            </button>

            <span>{quantity}</span>

            <button
              className={styles.orderInfo_button}
              onClick={increaseQuantity}
            >
              <img src="img/Buttons/Icons/white plus.svg" alt="" />
            </button>
          </div>

          <span className={styles.orderInfo_price}>${product.price}</span>
        </div>
      </li>
    </div>
  );
};
