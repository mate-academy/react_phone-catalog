import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useCart } from '../../context/CartContext';

type Variant = 'catalog' | 'slider';
interface Props {
  product: Product;
  variant: Variant;
}

export const ProductCard = ({ product, variant }: Props) => {
  const { addToCart } = useCart();

  return (
    <article
      className={`${styles.card} ${variant === 'catalog' ? styles.catalogCard : ''}`}
    >
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.cardLink}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles.specImage}
        />
        <h3 className={styles.specName}>{product.name}</h3>
        <div className={styles.priceSection}>
          <p className={styles.specPrice}>${product.price}</p>
          <del className={styles.specFullPrice}>${product.fullPrice}</del>
        </div>
        <div className={styles.divider} />
        <p className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specChar}>{product.screen}</span>
        </p>
        <p className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specChar}>{product.capacity}</span>
        </p>
        <p className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specChar}>{product.ram}</span>
        </p>
      </Link>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cartButton}
          onClick={() =>
            addToCart({
              id: product.id,
              image: product.image,
              name: product.name,
              price: `$${product.price}`,
            })
          }
        >
          Add to cart
        </button>
        <button type="button" className={styles.favButton}>
          <img
            src="./img/icons/add_favourites_button.png"
            alt="Add to favourites"
          />
        </button>
      </div>
    </article>
  );
};
