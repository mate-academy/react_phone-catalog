import { useState } from 'react';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { Product } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  discount?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, discount }) => {
  const [isActiveFavorite, setIsActiveFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleFavorite = () => {
    setIsActiveFavorite(!isActiveFavorite);
  };

  const handleAddToCart = () => {
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          src={`./${product.image}`}
          alt="product photo"
          className={styles.productPhoto}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.descriptionLink}
      >
        <p className={styles.productDescription}>{product.name}</p>
      </Link>

      <div className={styles.productPriceContainer}>
        <h3 className={styles.productPrice}>${product.price}</h3>
        {discount && (
          <p className={styles.productDiscount}>${product.fullPrice}</p>
        )}
      </div>

      <div className={styles.divider}></div>

      <div className={styles.techCharacteristicsContainer}>
        <div className={styles.characteristic}>
          <p className={styles.characteristicTitle}>Screen</p>
          <p className={styles.characteristicValue}>{product.screen}</p>
        </div>
        <div className={styles.characteristic}>
          <p className={styles.characteristicTitle}>Capacity</p>
          <p className={styles.characteristicValue}>{product.capacity}</p>
        </div>
        <div className={styles.characteristic}>
          <p className={styles.characteristicTitle}>RAM</p>
          <p className={styles.characteristicValue}>{product.ram}</p>
        </div>
      </div>

      <div className={styles.btnsContainer}>
        <button
          className={classNames(styles.addToCardBtn, {
            [styles.addedToCart]: isAdded,
          })}
          onClick={handleAddToCart}
        >
          {isAdded ? `Added to cart` : `Add to cart`}
        </button>
        <button
          className={classNames(styles.favoriteBtn, {
            [styles.favoriteActive]: isActiveFavorite,
          })}
          onClick={handleFavorite}
        ></button>
      </div>
    </div>
  );
};
