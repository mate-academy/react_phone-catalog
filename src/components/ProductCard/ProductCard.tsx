import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import styles from './ProductCard.module.scss';

export function ProductCard({ product }: { product: Product }) {
  const { cart, favorites, addCart, toggleFavorite } = useStore();
  const added = cart.some(item => item.product.id === product.id);
  const favorite = favorites.includes(product.id);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.productLink}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <div className={styles.price}>
        ${product.price}
        <del>${product.fullPrice}</del>
      </div>
      <dl>
        <div>
          <dt>Screen</dt>
          <dd>6.1&apos; IPS</dd>
        </div>
        <div>
          <dt>Capacity</dt>
          <dd>{product.capacities[0]}</dd>
        </div>
        <div>
          <dt>RAM</dt>
          <dd>4GB</dd>
        </div>
      </dl>
      <div className={styles.controls}>
        <button
          className={added ? styles.added : ''}
          onClick={() => addCart(product)}
        >
          {added ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={styles.heart}
          aria-label="Add to favorites"
          onClick={() => toggleFavorite(product.id)}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  );
}
