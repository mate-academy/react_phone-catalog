import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './CartItem.module.scss';
import { getBaseUrl } from '../../utils/BaseUrl';

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

  const { itemId, category, name, price, fullPrice, image } = product;

  const idToUse = itemId || product.id;

  const handleDecrease = () => {
    if (quantity > 1 && onQuantityChange) {
      onQuantityChange(idToUse, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (onQuantityChange) {
      onQuantityChange(idToUse, quantity + 1);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(idToUse);
    }
  };

  // Безопасное определение цены: проверяем price, затем fullPrice, иначе 0
  const actualPrice = Number(price ?? fullPrice ?? 0);
  const totalPrice = actualPrice * quantity;

  // Формирование корректного пути к картинке
  const imageUrl = image?.startsWith('http')
    ? image
    : `${getBaseUrl()}${image}`;

  return (
    <div className={styles.cartItem}>
      {/* 1. Кнопка удаления */}
      <button
        type="button"
        className={styles.removeBtn}
        onClick={handleRemove}
        aria-label="Remove item"
      >
        <img
          src={`${getBaseUrl()}img/icons/close.svg`}
          alt="Remove"
          className={styles.removeIcon}
        />
      </button>

      {/* 2. Изображение и Название */}
      <Link to={`/${category}/${idToUse}`} className={styles.productInfo}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={name} className={styles.image} />
        </div>
        <p className={styles.title}>{name}</p>
      </Link>

      <div className={styles.actions}>
        {/* 3. Изменение количества */}
        <div className={styles.quantityControls}>
          <button
            type="button"
            className={styles.quantityBtn}
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            type="button"
            className={styles.quantityBtn}
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* 4. Безопасный вывод цены */}
        <div className={styles.priceBlock}>
          <span className={styles.price}>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};
