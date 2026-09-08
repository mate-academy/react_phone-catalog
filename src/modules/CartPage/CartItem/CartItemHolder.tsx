import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, useCart } from '../../CartProvider/CartProvider';
import { X, Plus, Minus } from 'lucide-react';
import styles from './CartItemHolder.module.scss';

interface CartItemProps {
  item: CartItem;
}

export const CartItemHolder: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useCart();
  const { addToCart } = useCart();
  const { onSubtractFromCart } = useCart();
  const { getItemTotalPrice } = useCart();

  const navigate = useNavigate();

  const itemTotalPrice = getItemTotalPrice(item);

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      color: item.color,
      capacity: item.capacity,
    });
  };

  const handleSubtractFromCart = () => {
    onSubtractFromCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      color: item.color,
      capacity: item.capacity,
    });
  };

  const handleRemoveFromCart = () => {
    removeFromCart({
      id: item.id,
      color: item.color,
      capacity: item.capacity,
      name: item.name,
      image: item.image,
      price: item.price,
    });
  };

  return (
    <div className={styles.cartItem__Container}>
      <div className={styles.cartItem__Header}>
        <div className={styles.cartItem__HeaderUpper}>
          <X
            className={styles.cartItem__Close}
            onClick={handleRemoveFromCart}
          />
          <img
            src={item.image}
            className={styles.cartItem__Image}
            onClick={() => navigate(`/${item.category}/${item.id}`)}
          />
        </div>
        <p
          className={styles.cartItem__Name}
          onClick={() => navigate(`/${item.category}/${item.id}`)}
        >
          {item.name}
        </p>
      </div>
      <div className={styles.cartItem__Controls}>
        <div className={styles.cartItem__Buttons}>
          <button
            className={styles.cartItem__ControlsButton}
            onClick={handleSubtractFromCart}
            disabled={item.quantity === 1}
          >
            <Minus />
          </button>
          <p className={styles.cartItem__Quantity}>{item.quantity}</p>
          <button
            className={styles.cartItem__ControlsButton}
            onClick={handleAddToCart}
          >
            <Plus />
          </button>
        </div>
        <h3 className={styles.cartItem__Price}>${itemTotalPrice}</h3>
      </div>
    </div>
  );
};
