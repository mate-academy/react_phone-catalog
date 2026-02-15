import React from 'react';
import { Product } from '../../types/product';
import styles from './ProductCard.module.scss';
import ActionButtons from '../ActionButtons/ActionButtons';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <article className={styles.productCard} onClick={onClick}>
      <div className={styles.productCard__imageContainer}>
        <img src={product.images[0]} alt={product.name} />
      </div>
      <div className={styles.productCard__titleContainer}>
        <h3 className={styles.productCard__productTitle}>{product.name}</h3>
      </div>
      <div className={styles.productCard__price}>${product.priceRegular}</div>
      <div className={styles.productCard__verticalLine}></div>
      <div className={styles.productCard__description}>
        <div className={styles.productCard__screen}>
          <div className={styles.productCard__label}>Screen</div>
          <div className={styles.productCard__value}>
            {product.screen.slice(0, 10)}
          </div>
        </div>
        <div className={styles.productCard__ram}>
          <div className={styles.productCard__label}>RAM</div>
          <div className={styles.productCard__value}>{product.ram}</div>
        </div>
        <div className={styles.productCard__capacity}>
          <div className={styles.productCard__label}>Capacity</div>
          <div className={styles.productCard__value}>{product.capacity}</div>
        </div>
      </div>
      <ActionButtons product={product} />
    </article>
  );
};

export default ProductCard;
