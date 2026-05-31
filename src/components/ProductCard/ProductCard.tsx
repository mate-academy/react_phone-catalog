import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types';
import { AppContext } from '../../context/AppContext';
import styles from './ProductCard.module.scss';

export const ProductCard = ({ product }: { product: Product }) => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { addToCart, isInCart, toggleFavorite, isFavorite } = context;
  const active = isInCart(product.id);
  const favorite = isFavorite(product.id);
  const priceDiff = product.priceRegular - product.priceDiscount;

  return (
    <article className={styles.card}>
      <div className={styles.photo}>
        <Link to={`/product/${product.id}`} className={styles.imageLink}>
          <img src={product.images[0]} alt={product.name} />
        </Link>
        <button
          type="button"
          className={classNames(styles.favorite, {
            [styles.favorited]: favorite,
          })}
          onClick={() => toggleFavorite(product.id)}
          aria-label="Toggle favorite"
        >
          <span className="fa fa-heart" />
        </button>
      </div>
      <div className={styles.body}>
        <Link to={`/product/${product.id}`} className={styles.title}>
          {product.name}
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.priceDiscount}</span>
          {priceDiff > 0 && (
            <>
              <span className={styles.regular}>${product.priceRegular}</span>
              <span className={styles.discount}>-${priceDiff}</span>
            </>
          )}
        </div>
        <p className={styles.details}>
          {product.color} · {product.capacity}
        </p>
        <button
          type="button"
          className={classNames(styles.addButton, { [styles.added]: active })}
          onClick={() => addToCart(product)}
        >
          {active ? 'Added to cart' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
};
