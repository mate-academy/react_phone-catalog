import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getAssetUrl } from '../../utils/assets';
import { getCurrentPrice, getProductId } from '../../utils/product';
import styles from './CartItem.module.scss';

export interface CartItemType {
  product: Product;
  quantity: number;
}

interface Props {
  item: CartItemType;
  onQuantityChange?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const { product, quantity } = item;

  if (!product) {
    return null;
  }

  const { name } = product;
  const idToUse = getProductId(product);
  const totalPrice = getCurrentPrice(product) * quantity;
  const imageUrl = getAssetUrl(product.image || product.images?.[0]);

  return (
    <div className={styles.cartItem}>
      <button
        type="button"
        className={styles.removeBtn}
        onClick={() => onRemove?.(idToUse)}
        aria-label="Remove item"
      >
        <img
          src={getAssetUrl('img/icons/close.svg')}
          alt=""
          className={styles.removeIcon}
        />
      </button>

      <Link to={`/product/${idToUse}`} className={styles.productInfo}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={name} className={styles.image} />
        </div>
        <p className={styles.title}>{name}</p>
      </Link>

      <div className={styles.actions}>
        <div className={styles.quantityControls}>
          <button
            type="button"
            className={styles.quantityBtn}
            onClick={() => onQuantityChange?.(idToUse, quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            type="button"
            className={styles.quantityBtn}
            onClick={() => onQuantityChange?.(idToUse, quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className={styles.priceBlock}>
          <span className={styles.price}>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};
