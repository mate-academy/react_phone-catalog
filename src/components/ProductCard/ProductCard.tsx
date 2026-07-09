import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const imageSrc = `${import.meta.env.BASE_URL}${product.image}`;
  const heartIconSrc = `${import.meta.env.BASE_URL}img/icons/heart.svg`;

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img src={imageSrc} alt={product.name} className={styles.image} />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.priceBlock}>
        <span className={styles.price}>${product.price}</span>
        <span className={styles.fullPrice}>${product.fullPrice}</span>
      </div>

      <div className={styles.divider} />

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>

        <div className={styles.spec}>
          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>
        </div>

        <div className={styles.spec}>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button type="button" className={styles.addButton}>
          Add to cart
        </button>

        <button
          type="button"
          className={styles.favoriteButton}
          aria-label="Add to favorites"
        >
          <img src={heartIconSrc} alt="" className={styles.heartIcon} />
        </button>
      </div>
    </article>
  );
};
