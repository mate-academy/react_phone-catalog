import { useContext } from 'react';
import { Product, ProductWithDetails } from '../../../../_types/products';
import styles from './CartItem.module.scss';
import { CartContext } from '../../../shared/_store/CartProvider';
import { IconButton } from '../../../shared/components/IconButton';
import { Close } from '../../../shared/_constants/icons';

interface CartItemType {
  id: string;
  quantity: number;
  product: ProductWithDetails | Product | undefined;
}
type Props = {
  cartItem: CartItemType;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__row}>
        <button
          onClick={() => removeFromCart(cartItem.id)}
          className={styles.cartItem__close}
        >
          {<Close />}
        </button>
        <div>
          <img
            src={cartItem.product?.image}
            alt={`Image of ${cartItem.product?.name}`}
            className={styles.cartItem__image}
          />
        </div>
        <div className={styles.cartItem__title}>{cartItem.product?.name}</div>
      </div>
      <div
        className={`${styles.cartItem__row} ${styles[`cartItem__row--second`]}`}
      >
        <div className={styles.cartItem__counter}>
          <IconButton
            modificator="minus"
            onClick={() => decreaseQuantity(cartItem.id)}
            disabled={cartItem.quantity === 1}
          />
          <div className={styles.cartItem__count}>{cartItem.quantity}</div>
          <IconButton
            modificator="plus"
            onClick={() => increaseQuantity(cartItem.id)}
          />
        </div>
        <h3 className={styles.cartItem__price}>
          &#36;
          {cartItem.quantity * (cartItem.product ? cartItem.product?.price : 0)}
        </h3>
      </div>
    </div>
  );
};
