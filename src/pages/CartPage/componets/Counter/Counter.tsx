import { updateQuantity } from '../../../../shared/utils/cart/updateQuantity';
import { useProducts } from '../../../../shared/context/ProductsContext';
import minusActive from '../../../../assets/icons/cart_icons/MinusActive.svg';
import minusIco from '../../../../assets/icons/cart_icons/Minus.svg';
import plusIco from '../../../../assets/icons/cart_icons/plus.svg';
import styles from './Counter.module.scss';
import { Product } from '../../../../shared/types/Product';
import { useEffect, useState } from 'react';

type CounterProps = {
  id: string;
  quantity: number;
  product: Product;
};

export const Counter: React.FC<CounterProps> = ({ id, quantity, product }) => {
  const { cartItems, setCartItems } = useProducts();
  const [price, setPrice] = useState<number>(product.price);

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1, cartItems, setCartItems);
    }
  };

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1, cartItems, setCartItems);
  };

  useEffect(() => {
    setPrice(product.price * quantity);
  }, [product.price, quantity]);

  return (
    <div className={styles.counterAndPrice}>
      <div className={styles.counter}>
        <button
          className={`${styles.counter__item} ${quantity > 1 ? '' : styles.counter__minus}`}
          onClick={handleDecrease}
        >
          <img
            src={quantity > 1 ? minusActive : minusIco}
            alt="Decrease quantity"
          />
        </button>
        <span className={styles.counter__countValue}>{quantity}</span>
        <button className={styles.counter__item} onClick={handleIncrease}>
          <img src={plusIco} alt="Increase quantity" />
        </button>
      </div>
      <p className={styles.item__price}>${price}</p>
    </div>
  );
};
