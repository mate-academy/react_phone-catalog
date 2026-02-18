import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartCard.module.scss';
import { Product } from '../../types/Product';

const base = import.meta.env.BASE_URL ?? '/';
const resolveUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`;
};

interface Props {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

const CartCard: React.FC<Props> = ({
  product,
  quantity,
  onRemove,
  onQuantityChange,
}) => {
  const img =
    product.images && product.images.length
      ? product.images[0]
      : 'img/phones/placeholder.png';

  const priceRegular = product.priceRegular ?? product.price ?? 0;
  const priceDiscount = product.priceDiscount ?? null;
  const price = priceDiscount ?? priceRegular;
  const totalPrice = price * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <article className={styles.cartCard}>
      {/* Block 1: Remove button + Image + Title */}
      <div className={styles.cartCard__top}>
        <button
          type="button"
          className={styles.cartCard__close}
          onClick={onRemove}
          aria-label="Remove from cart"
        >
          <img src={resolveUrl('icons/CloseGray.svg')} alt="" />
        </button>

        <Link
          to={`/product/${product.category}/${product.id}`}
          className={styles.cartCard__media}
        >
          <img src={img} alt={product.name} />
        </Link>

        <Link
          to={`/product/${product.category}/${product.id}`}
          className={styles.cartCard__title}
        >
          {product.name}
        </Link>
      </div>

      {/* Block 2: Quantity controls + Price */}
      <div className={styles.cartCard__bottom}>
        <div className={styles.quantityControl}>
          <button
            type="button"
            className={styles.quantityControl__btn}
            onClick={handleDecrease}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
          >
            <img src={resolveUrl('icons/Minus.svg')} alt="" />
          </button>
          <span className={styles.quantityControl__value}>{quantity}</span>
          <button
            type="button"
            className={styles.quantityControl__btn}
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <img src={resolveUrl('icons/Plus.svg')} alt="" />
          </button>
        </div>

        <div className={styles.cartCard__price}>${totalPrice}</div>
      </div>
    </article>
  );
};

export default CartCard;
