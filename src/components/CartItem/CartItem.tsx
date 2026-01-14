import React from 'react';
import styles from './CartItem.module.scss';
// eslint-disable-next-line max-len
import { CartItem as CartItemType } from '../../modules/shared/context/CartContext';
import { useCart } from '../../modules/shared/context/CartContext';
import { getProductImage } from '../../utils/productHelper';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { remove, changeQty } = useCart();
  const { product, quantity, id } = item;
  const img = getProductImage(product);
  const price = Number(product.priceDiscount ?? product.price ?? 0);

  return (
    <div className={styles.cartItem}>
      <button
        className={styles.cartItem__removeBtn}
        onClick={() => remove(id)}
        title="Remove"
      >
        <img src="./icons/Close light.svg" alt="delete" />
      </button>
      <img src={img} alt={product.name} className={styles.cartItem__image} />
      <h4 className={styles.cartItem__name}>{product.name}</h4>
      <div className={styles.cartItem__qtyBlock}>
        <button
          className={styles.cartItem__qtyBtn}
          onClick={() => changeQty(id, quantity - 1)}
          disabled={quantity <= 1}
        >
          <img src="./icons/Minus.svg" alt="Minus" />
        </button>
        <span className={styles.cartItem__qty}>{quantity}</span>
        <button
          className={styles.cartItem__qtyBtn}
          onClick={() => changeQty(id, quantity + 1)}
        >
          <img src="./icons/Plus.svg" alt="Plus" />
        </button>
      </div>
      <h3 className={styles.cartItem__price}>${price * quantity}</h3>
    </div>
  );
};
