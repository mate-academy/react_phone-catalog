import React from 'react';
import { CartItem as CartItemType } from '../../utils/CartContext';
import { useCart } from '../../utils/CartContext';
import styles from './CartItemStyles.module.scss';
import { Product } from '../../types/ProductTypes';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const getProductPrice = (): number => {
    if ('price' in item.product) {
      return (item.product as Product).price;
    }
    return item.product.priceDiscount;
  };

  const getProductImage = (): string => {
    if ('image' in item.product) {
      return (item.product as Product).image;
    }
    return item.product.images[0];
  };

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const price = getProductPrice();
  const totalPrice = price * item.quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.conatinerUp}>
        <div className={styles.removeItem}>
          <button className={styles.removeButton} onClick={handleRemove}>
            &#10006;
          </button>
        </div>
        <div className={styles.itemInfo}>
          <img src={getProductImage()} alt={item.product.name} className={styles.itemImage} />
          <div className={styles.itemDetails}>
            <h3 className={styles.itemName}>{item.product.name}</h3>
          </div>
        </div>
      </div>
      <div className={styles.containerDown}>
        <div className={styles.quantityControls}>
          <button
            className={styles.quantityButton}
            onClick={handleQuantityDecrease}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button className={styles.quantityButton} onClick={handleQuantityIncrease}>
            +
          </button>
        </div>

        <div className={styles.itemTotal}>
          <span className={styles.totalPrice}>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};
