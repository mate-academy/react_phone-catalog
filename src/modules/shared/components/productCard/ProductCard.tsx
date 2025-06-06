import React from 'react';
import styles from './ProductCard.module.scss';
import { Products } from '../../../../types/Products';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToCartButton } from '../toCartButton';
import { ToFavouriteButton } from '../toFavoriteButton';

type Props = {
  product: Products;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const onClickLink = () => {
    navigate(`/${product.category}/${product.itemId}`, {
      state: pathname + search,
    });
  };

  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.cardImg}
        onClick={onClickLink}
      />

      <p className={styles.productName} onClick={onClickLink}>
        {product.name}
      </p>

      <div className={styles.priceContainer}>
        <p className={styles.discountPrice}>{`$${product.price}`}</p>

        {product.fullPrice !== product.price && (
          <p className={styles.price}>{`$${product.fullPrice}`}</p>
        )}
      </div>

      <div className={styles.line} />

      <ul className={styles.list}>
        <li className={styles.listItem}>
          <p className={`${styles.productData}`}>Screen</p>
          <p className={`${styles.productData}`}>{product.screen}</p>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.productData}`}>Capacity</p>
          <p className={`${styles.productData}`}>{product.capacity}</p>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.productData}`}>RAM</p>
          <p className={`${styles.productData}`}>{product.ram}</p>
        </li>
      </ul>

      <div className={styles.buttons}>
        <ToCartButton product={product} />

        <ToFavouriteButton product={product} />
      </div>
    </div>
  );
};
