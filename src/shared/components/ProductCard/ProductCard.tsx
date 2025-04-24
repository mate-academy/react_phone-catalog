import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { AllProducts } from '../../types/AllProducts/AllProducts';
import React from 'react';

type Props = {
  product: AllProducts & { hotPrice?: number };
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          loading="lazy"
          className={styles.productCard__mainImage}
          src={`${product.image}`}
          alt="Зображення продукту"
        />
      </Link>
      <p className={styles.productCard__description}>{product.name}</p>
      {product?.hotPrice ? (
        <div className={styles.productCard__priceContainer}>
          <h3 className={styles.productCard__price}>{`$${product.price}`}</h3>
          <h3
            className={styles.productCard__fullPrice}
          >{`$${product.fullPrice}`}</h3>
        </div>
      ) : (
        <h3 className={styles.productCard__price}>{`$${product.fullPrice}`}</h3>
      )}
      <span className={styles.productCard__line}></span>
      <div className={styles.productCard__featureWrapper}>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>Screen</p>
          <p className={styles.productCard__featureValue}>{product.screen}</p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>Capacity</p>
          <p className={styles.productCard__featureValue}>{product.capacity}</p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>RAM</p>
          <p className={styles.productCard__featureValue}>{product.ram}</p>
        </div>
      </div>
      <div className={styles.productCard__buttons}>
        <button className={styles.productCard__addToCart}>Add to cart</button>
        <button className={styles.productCard__addToFavorites}>
          <img
            loading="lazy"
            src="src/assets/images/productsSlider/favorites-icon.svg"
            alt="Іконка для додавання в улюбленні"
          />
        </button>
      </div>
    </div>
  );
};
