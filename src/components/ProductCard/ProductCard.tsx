import { Link } from 'react-router-dom';
import type { Product } from '../../shared/types';
import { useShop } from '../../shared/context/ShopContext';
import styles from './ProductCard.module.scss';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, isInCart } = useShop();
  const favorite = isFavorite(product.id);
  const inCart = isInCart(product.id);

  return (
    <article className={styles.card}>
      <Link to={`product/${product.id}`} className={styles.imageLink}>
        <img
          src={product.image || 'img/placeholder.png'}
          alt={product.name}
          loading="lazy"
          onError={event => {
            const target = event.currentTarget;

            target.style.visibility = 'hidden';
          }}
        />
      </Link>
      <Link to={`product/${product.id}`} className={styles.name}>
        {product.name}
      </Link>
      <div className={styles.price}>
        <strong>${product.price}</strong>
        {product.fullPrice && product.fullPrice > product.price && (
          <del>${product.fullPrice}</del>
        )}
      </div>
      <div className={styles.specs}>
        {[
          ['Screen', product.screen],
          ['Capacity', product.capacity],
          ['RAM', product.ram],
        ]
          .filter(row => row[1])
          .map(([label, value]) => (
            <div key={String(label)}>
              <span>{label}</span>
              <b>{String(value)}</b>
            </div>
          ))}
      </div>
      <div className={styles.buttons}>
        <button
          className={inCart ? styles.added : styles.add}
          onClick={() => addToCart(product)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={`${styles.heart} ${favorite ? styles.favorited : ''}`}
          onClick={() => toggleFavorite(product)}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  );
}
