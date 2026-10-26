import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { FavoritesButton } from '../ui/FavouritesButton/FavoritesButton';
import { PrimaryButton } from '../ui/PrimaryButton/PrimaryButton';
import { Product } from '../../types/Types';
import cn from 'classnames';
import { useStoreContext } from 'src/context/StoreContext';

type Props = {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice = false,
}) => {
  const { toggleCart } = useStoreContext();
  const { isProductInCart, action } = toggleCart(product.name);

  return (
    <div className={styles.card}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.link}
      >
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>

      <h3 className={styles.title}>{product.name}</h3>
      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        {showFullPrice && (
          <span className={cn(styles.price, styles.fullPrice)}>
            ${product.fullPrice}
          </span>
        )}
      </div>

      <hr className={styles.hr} />
      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.label}>Screen</span>
          <span>{product.screen}</span>
        </div>

        <div className={styles.spec}>
          <span className={styles.label}>Capacity</span>
          <span>{product.capacity}</span>
        </div>

        <div className={styles.spec}>
          <span className={styles.label}>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <PrimaryButton onClick={action} isProductInCart={isProductInCart}>
          {isProductInCart ? 'Added to cart' : 'Add to cart'}
        </PrimaryButton>

        <FavoritesButton product={product}></FavoritesButton>
      </div>
    </div>
  );
};
