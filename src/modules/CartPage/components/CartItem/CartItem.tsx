import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import { getAssetUrl } from '../../../../utils/getAssetUrl'; // Перевірте шлях до utils
import styles from './CartItem.module.scss';

interface Props {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onChangeQuantity: (delta: number) => void;
}

export const CartItem: React.FC<Props> = ({
  product,
  quantity,
  onRemove,
  onChangeQuantity,
}) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__main}>
        <button
          type="button"
          onClick={onRemove}
          className={styles.cartItem__removeBtn}
          aria-label="Remove item"
        >
          <img src={getAssetUrl('img/icons/Close.svg')} alt="Close" />
        </button>
        <img
          src={getAssetUrl(product.image)}
          alt={product.name}
          className={styles.cartItem__img}
        />
        <Link
          to={`/product/${product.itemId}`}
          className={styles.cartItem__name}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles.cartItem__controls}>
        <div className={styles.cartItem__counter}>
          <button
            type="button"
            disabled={quantity <= 1}
            onClick={() => onChangeQuantity(-1)}
            className={styles.cartItem__countBtn}
          >
            -
          </button>
          <span className={styles.cartItem__count}>{quantity}</span>
          <button
            type="button"
            onClick={() => onChangeQuantity(1)}
            className={styles.cartItem__countBtn}
          >
            +
          </button>
        </div>
        <span className={styles.cartItem__price}>
          ${product.price * quantity}
        </span>
      </div>
    </div>
  );
};
