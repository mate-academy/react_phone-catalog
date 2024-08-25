import React from 'react';
import { Product, ProductDetailed } from '../../types/types';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { AddToCartButton } from '../AddToCartButton';
import { FavoriteButton } from '../FavoriteButton';

type Props = {
  product: Product | ProductDetailed;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const image = 'image' in product ? product.image : product.images[0];
  const price = 'price' in product ? product.price : product.priceDiscount;
  const fullPrice = 'fullPrice' in product ? product.fullPrice : product.priceRegular;
  const id = 'itemId' in product ? product.itemId : product.id;
  const category = 'category' in product ? product.category : '';
  const titleHeight = 'image' in product ? '63px' : '42px';

  return (
    <div className={styles.container}>
      <Link to={category ? `/${category}/${id}` : `../${id}`} className={styles.productLink}>
        <div className={styles.imageContainer}>
          <img src={image} alt={product.name} />
        </div>
        <p className={styles.title} style={{ height: titleHeight }}>
          {product.name}
        </p>
      </Link>
      <div className={styles.prices}>
        <p className={styles.price}>${price}</p>
        {fullPrice > 0 && <p className={styles.fullPrice}>${fullPrice}</p>}
      </div>
      <div className={styles.divider}></div>
      <div className={styles.description}>
        <div>
          <p className={styles.name}>Screen</p>
          <p className={styles.value}>{product.screen}</p>
        </div>
        <div>
          <p className={styles.name}>Capacity</p>
          <p className={styles.value}>{product.capacity}</p>
        </div>
        <div>
          <p className={styles.name}>RAM</p>
          <p className={styles.value}>{product.ram}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.cartButtonContainer}>
          <AddToCartButton product={product} />
        </div>
        <FavoriteButton product={product} />
      </div>
    </div>
  );
};
