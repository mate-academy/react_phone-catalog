import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductDetailed } from '../../types/ProductDetailed';
import styles from './ProductCard.module.scss';
import { normalizeProduct } from '../NormalizeProduct';
import { AddToCartButton } from '../AddToCartButton';
import { FavouriteButton } from '../FavouriteButton';
import React from 'react';

type Props = {
  product: Product | ProductDetailed;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { image, price, fullPrice, id, category } = normalizeProduct(product);

  return (
    <div className={styles.productCard}>
      <Link to={`/${category}/${id}`} className={styles.productCard__link}>
        <div className={styles.productCard__imgContainer}>
          <img src={image} alt={product.name} />
        </div>

        <p className={styles.productCard__title}>{product.name}</p>
      </Link>

      <div className={styles.productCard__priceContainer}>
        <p className={styles.productCard__price}>${price}</p>
        {fullPrice > 0 && (
          <p className={styles.productCard__fullPrice}>${fullPrice}</p>
        )}
      </div>

      <div className={styles.productCard__details}>
        <div className={styles.productCard__detail}>
          <p className={styles.productCard__detailLabel}>Screen</p>
          <p className={styles.productCard__detailValue}>
            {product.screen && product.screen.length > 15
              ? `${product.screen.slice(0, 15)}...`
              : product.screen}
          </p>
        </div>
        <div className={styles.productCard__detail}>
          <p className={styles.productCard__detailLabel}>Capacity</p>
          <p className={styles.productCard__detailValue}>{product.capacity}</p>
        </div>
        <div className={styles.productCard__detail}>
          <p className={styles.productCard__detailLabel}>RAM</p>
          <p className={styles.productCard__detailValue}>{product.ram}</p>
        </div>
      </div>

      <div className={styles.productCard__buttonsActions}>
        <AddToCartButton product={product} />
        <FavouriteButton product={product} />
      </div>
    </div>
  );
};
