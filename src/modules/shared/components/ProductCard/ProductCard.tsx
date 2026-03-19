import React, { useState } from 'react';
import { Product } from '@/types/Product';
import styles from './ProductCard.module.scss';
import { ButtonPrimary } from '@/modules/shared/ui/ButtonPrimary';
import { ButtonFavorite } from '@/modules/shared/ui/ButtonFavorite';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = true,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { name, price, fullPrice, screen, capacity, ram, image } = product;
  const isDiscounted = showDiscount && Number(fullPrice) > Number(price);

  return (
    <article className={styles.card}>
      <div className={styles.card__imageContainer}>
        <img src={image} alt={name} className={styles.card__image} />
      </div>
      <h3 className={styles.card__title}>{name}</h3>
      <div className={styles.card__price}>
        <span className={styles.card__priceCurrent}>
          ${isDiscounted ? price : fullPrice}
        </span>
        {isDiscounted && (
          <span className={styles.card__priceFull}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.card__divider} />

      <div className={styles.card__specs}>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>Screen</span>
          <span className={styles.card__specValue}>{screen}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>Capacity</span>
          <span className={styles.card__specValue}>{capacity}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>RAM</span>
          <span className={styles.card__specValue}>{ram}</span>
        </div>
      </div>
      <div className={styles.card__buttons}>
        <ButtonPrimary
          isSelected={isAdded}
          onClick={() => setIsAdded(!isAdded)}
        />
        <ButtonFavorite
          isFavorite={isFavorite}
          onClick={() => setIsFavorite(!isFavorite)}
        />
      </div>
    </article>
  );
};
