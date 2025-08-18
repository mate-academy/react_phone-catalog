import { useEffect, useState } from 'react';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { ProductDemo } from '../../../types/ProductDemo';
import { useMyContext } from '../../../Context/ProductContexts';

type OrderCardProps = {
  product: ProductDemo;
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

export const CartItem: React.FC<OrderCardProps> = ({ product }) => {
  const { setAddIsPressed, setPlusIsPressed, setMinusIsPressed } =
    useMyContext();
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
    setAddIsPressed(prev => !prev);
  };

  const increment = () => handleQuantityChange(quantity + 1);

  const decrement = () => handleQuantityChange(quantity - 1);

  const deleteOrder = () => {
    removeStoredItem(product.itemId);
    setAddIsPressed(prev => !prev);
  };

  return (
    <div className={styles.embla__slide}>
      <li className={styles.card}>
        <div className={styles.item}>
          <button className={styles.item_close} onClick={deleteOrder}>
            <img src="img/Additional images/icons/gray cross.svg" alt="close" />
          </button>
          <Link to={`/product/${product.itemId}`} className={styles.item_link}>
            <img
              className={styles.item_image}
              src={product.image}
              alt={product.name}
            />
          </Link>
          <Link to={`/product/${product.itemId}`} className={styles.item_name}>
            {product.name}
          </Link>
        </div>

        <div className={styles.orderInfo}>
          <div className={styles.orderInfo_quantity}>
            <button
              className={styles.orderInfo_button}
              onClick={() => {
                decrement();
                setMinusIsPressed(prev => !prev);
              }}
            >
              <img src="img/Buttons/Icons/white minus.svg" alt="minus" />
            </button>

            <span>{quantity}</span>

            <button
              className={styles.orderInfo_button}
              onClick={() => {
                increment();
                setPlusIsPressed(prev => !prev);
              }}
            >
              <img src="img/Buttons/Icons/white plus.svg" alt="plus" />
            </button>
          </div>

          <span className={styles.orderInfo_price}>${product.price}</span>
        </div>
      </li>
    </div>
  );
};
