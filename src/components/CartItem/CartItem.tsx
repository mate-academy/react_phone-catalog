import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';
import { CartItem as CartItemType } from '../../context/StoreContext';

interface Props {
  item: CartItemType;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const { product, quantity, id } = item;

  return (
    <div className={styles.card}>
      <button className={styles.removeBtn} onClick={() => onRemove(id)}>
        <img src="img/icons/Close.svg" alt="Remove" />
      </button>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.imageContainer}
      >
        <img src={`${product.image}`} alt={product.name} />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.name}
      >
        {product.name}
      </Link>

      <div className={styles.quantityContainer}>
        <button
          className={styles.quantityBtn}
          disabled={quantity === 1}
          onClick={() => onDecrease(id)}
        >
          <img src="img/icons/Minus.svg" alt="Decrease" />
        </button>

        <span className={styles.quantityValue}>{quantity}</span>

        <button className={styles.quantityBtn} onClick={() => onIncrease(id)}>
          <img src="img/icons/Plus.svg" alt="Increase" />
        </button>
      </div>

      <p className={styles.price}>${product.price * quantity}</p>
    </div>
  );
};
