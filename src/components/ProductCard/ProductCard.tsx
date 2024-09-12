import React from 'react';
import './ProductCard.module.scss';
import { ActionButtons } from '../ActionButtons';
import { LimitedProduct } from '../../types/Product';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { useAppContext } from '../../context/AppContext';


type ProductCardProps = {
  product: LimitedProduct;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product}) => {

  if (!product) {
    return <div>No product available</div>;
  }

  const { image, name, price, fullPrice, screen, capacity, ram } = product;
  const { setClickedProduct } = useAppContext();

  const handleClickedProduct = () => {

    if(product !== undefined) {
      localStorage.setItem('clickedProduct', JSON.stringify(product));
      setClickedProduct(product)
    }
  }

  return (
    <div className={styles.ProductCard}>
      <Link
        to={`/product/${encodeURIComponent(product.itemId)}`}
        className={styles.imageContainer}
        onClick = {handleClickedProduct}
      >
        <img
          className={styles.image}
          src={image}
          alt={name}
        />
      </Link>

      <div className={styles.wrapper}>
        <Link to={`/product/${encodeURIComponent(product.itemId)}`} className={styles.title}>
          {name}
        </Link>

        <div className={styles.price}>
          <div className={styles.hotPrice}>${price}</div>
          <div className={styles.existPrice}>${fullPrice}</div>
        </div>

        <div className={styles.divider} />

        <div className={styles.description}>
          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Screen</p>
            <p className={styles.descriptionText}>{screen}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Capacity</p>
            <p className={styles.descriptionText}>{capacity}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>RAM</p>
            <p className={styles.descriptionText}>{ram}</p>
          </div>
        </div>

        <ActionButtons product={product} />
      </div>
    </div>
  );
};
