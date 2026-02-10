import styles from './CartItem.module.scss';
import { CartItemType } from '../../types/CartItemType';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../features/cart';
import { useDispatch } from 'react-redux';

interface Props {
  product: CartItemType;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const item = product.product;
  const quantity = product.quantity;

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__leftSide}>
        <button
          className={styles.cartItem__removeButton}
          onClick={handleRemoveFromCart}
        />
        <div className={styles.cartItem__image}>
          <img src={item.image} alt={item.name} />
        </div>
        <h2 className={styles.cartItem__title}>{item.name}</h2>
      </div>

      <div className={styles.cartItem__rightSide}>
        <div className={styles.cartItem__buttons}>
          <button
            className={styles.cartItem__minusButton}
            disabled={quantity <= 1}
            onClick={handleDecreaseQuantity}
          ></button>
          <h2 className={styles.cartItem__quantity}>{quantity}</h2>
          <button
            className={styles.cartItem__plusButton}
            disabled={quantity >= 99}
            onClick={handleIncreaseQuantity}
          ></button>
        </div>
        <div className={styles.cartItem__price}>{`$${item.price}`}</div>
      </div>
    </div>
  );
};
