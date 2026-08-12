import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { useTranslation } from '../../hooks';
import type { ProductFromServer } from '../../types/product';
import styles from './CartItem.module.scss';

type Props = {
  product: ProductFromServer;
  quantity: number;
  isBrandNew?: boolean;
  onRemove: (itemId: string) => void;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
};

const REMOVE_ANIMATION_DELAY = 250;

export const CartItem = ({
  product,
  quantity,
  isBrandNew = false,
  onRemove,
  onIncrease,
  onDecrease,
}: Props) => {
  const t = useTranslation();

  const [isRemoving, setIsRemoving] = useState(false);
  const removeTimerId = useRef<number | null>(null);

  const imageSrc = `${import.meta.env.BASE_URL}${product.image}`;
  const productLink = `/${product.category}/${product.itemId}`;

  const visiblePrice = isBrandNew ? product.fullPrice : product.price;
  const totalPrice = visiblePrice * quantity;

  const itemClassName = [styles.item, isRemoving && styles.itemRemoving]
    .filter(Boolean)
    .join(' ');

  const handleRemove = () => {
    if (isRemoving) {
      return;
    }

    setIsRemoving(true);

    removeTimerId.current = window.setTimeout(() => {
      onRemove(product.itemId);
    }, REMOVE_ANIMATION_DELAY);
  };

  useEffect(() => {
    return () => {
      if (removeTimerId.current) {
        window.clearTimeout(removeTimerId.current);
      }
    };
  }, []);

  return (
    <article
      className={itemClassName}
      aria-label={`${product.name}, ${t.cart.quantity}: ${quantity}`}
    >
      <div className={styles.info}>
        <button
          className={styles.removeButton}
          type="button"
          aria-label={`${t.cart.removeFromCart}: ${product.name}`}
          title={`${t.cart.removeFromCart}: ${product.name}`}
          disabled={isRemoving}
          onClick={handleRemove}
        >
          <Icon name="close" size={16} />
        </button>

        <Link
          className={styles.imageLink}
          to={productLink}
          aria-label={`${t.cart.openProduct}: ${product.name}`}
          tabIndex={isRemoving ? -1 : 0}
        >
          <img className={styles.image} src={imageSrc} alt={product.name} />
        </Link>

        <h3 className={styles.title}>
          <Link
            className={styles.titleLink}
            to={productLink}
            tabIndex={isRemoving ? -1 : 0}
          >
            {product.name}
          </Link>
        </h3>
      </div>

      <div className={styles.bottom}>
        <div className={styles.quantity}>
          <IconButton
            icon="minus"
            label={`${t.cart.decreaseQuantity}: ${product.name}`}
            disabled={quantity <= 1 || isRemoving}
            onClick={() => onDecrease(product.itemId)}
          />

          <span
            className={styles.quantityValue}
            aria-label={`${t.cart.quantity}: ${quantity}`}
          >
            {quantity}
          </span>

          <IconButton
            icon="plus"
            label={`${t.cart.increaseQuantity}: ${product.name}`}
            disabled={isRemoving}
            onClick={() => onIncrease(product.itemId)}
          />
        </div>

        <strong className={styles.price}>${totalPrice}</strong>
      </div>
    </article>
  );
};
