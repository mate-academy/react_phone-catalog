import { CartItem, useCart } from '../../../../contexts/CartContext';
import styles from './CartProduct.module.scss';

import removeBtn from '/icons/close-icon.png';
import plusIcon from '/icons/plus-icon.png';
import minusIcon from '/icons/minus-icon.png';
import minusIconActive from '/icons/minus-active-icon.png';

type Props = {
  item: CartItem;
};

export const CartProduct: React.FC<Props> = ({ item }) => {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <div className={styles.cart_product}>
      <button
        className={styles.cart_product_remove_btn}
        onClick={() => removeFromCart(item.id)}
      >
        <img src={removeBtn} alt="removeBtn" />
      </button>
      <img
        src={item.product.image}
        alt={item.product.name}
        className={styles.cart_product_img}
      />
      <p className={styles.cart_product_item_name}>{item.product.name}</p>
      <div className={styles.cart_product_quantity}>
        <button
          className={styles.cart_product_decrease_btn}
          onClick={() => decreaseQty(item.id)}
          disabled={item.quantity === 1}
        >
          <img
            src={item.quantity === 1 ? minusIcon : minusIconActive}
            alt="minusIcon"
            className={styles.cart_product_icon}
          />
        </button>
        <p className={styles.cart_product_qty}>{item.quantity}</p>
        <button
          className={styles.cart_product_increase_btn}
          onClick={() => increaseQty(item.id)}
        >
          <img
            src={plusIcon}
            alt="plusIcon"
            className={styles.cart_product_icon}
          />
        </button>
      </div>

      <div className={styles.cart_product_price}>${item.product.price}</div>
    </div>
  );
};
