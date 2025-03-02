import { useContext } from 'react';
import { CartItem as CartItemType } from '../../../../types/types';
import styles from './CartItem.module.scss';
import { CartContext } from '../../../../context/CartContext';
import { Link } from 'react-router-dom';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  if (!item.product) {
    return null;
  }

  const handleDecrease = () => {
    if (item.amount > 1) {
      updateCartItemQuantity(item.product?.itemId, item.amount - 1);
    } else {
      removeFromCart(item.product?.itemId);
    }
  };

  const handleIncrease = () => {
    updateCartItemQuantity(item.product?.itemId, item.amount + 1);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.top}>
        <button
          className={styles.deleteButton}
          onClick={() => removeFromCart(item.product?.itemId)}
        ></button>

        <Link
          to={`/${item.product.category}/${item.product.itemId}`}
          className={styles.cartItemLink}
        >
          <div className={styles.cartItemImage}>
            <img src={item.product.image} alt={item.product.name} />
          </div>

          <p className={styles.productName}>{item.product.name}</p>
        </Link>
      </div>

      <div className={styles.bottom}>
        <div className={styles.itemQuantity}>
          <button
            disabled={item.amount === 1}
            className={`${styles.decrease} ${item.amount === 1 ? styles.disabled : ''}`}
            onClick={handleDecrease}
          ></button>
          <div className={styles.quantity}>{item.amount}</div>
          <button className={styles.increase} onClick={handleIncrease}></button>
        </div>

        <p className={styles.itemPrice}>${(item.product.price || 0) * item.amount}</p>
      </div>
    </div>
  );
};
