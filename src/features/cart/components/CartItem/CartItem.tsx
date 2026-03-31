import { X, Minus, Plus } from 'lucide-react';
import {
  useProductStore,
  CartItem as CartItemType,
} from '@/store/productStore';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useProductStore();
  const { product, quantity } = item;
  // const totalPrice = product.price * quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={styles.item}
    >
      <div className={styles.itemTop}>
        <button
          className={styles.removeBtn}
          onClick={() => removeFromCart(product.id)}
          aria-label="Remove"
          title="Remove"
        >
          <X size={16} strokeWidth={2} />
        </button>

        <img
          src={`/${product.image}`}
          alt={product.name}
          className={styles.image}
        />

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.name}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles.itemBottom}>
        <div className={styles.controls}>
          <button
            className={styles.controlBtn}
            onClick={() => decreaseQuantity(product.id)}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <div className={styles.quantityWrapper}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={quantity}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'backOut' }}
                className={styles.quantity}
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
          </div>
          <button
            className={styles.controlBtn}
            onClick={() => increaseQuantity(product.id)}
          >
            <Plus size={16} />
          </button>
        </div>

        <p className={styles.price}>${product.price * quantity}</p>
      </div>
    </motion.div>
  );
};
