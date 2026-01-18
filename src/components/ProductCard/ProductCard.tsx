import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import button from '../../styles/button.module.scss';
import styles from './ProductCard.module.scss';
import { Product } from '../../shared/interfaces/Product';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';

interface Props {
  product: Product;
  showOldPrice?: boolean;
}

export const ProductCard = ({ product, showOldPrice }: Props) => {
  const { screen, capacity, ram } = product;

  const { cart, addToCart, removeFromCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();
  const currentPrice = product.price;
  const oldPrice = product.fullPrice;

  const isAdded = cart.some(p => p.product.id === product.id);
  const favourite = isFavourite(product.id);

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <Link to={`/phones/${product.itemId}`} className={styles.imageLink}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </Link>

        <Link to={`/phones/${product.itemId}`} className={styles.title}>
          {product.name}
        </Link>
      </div>

      <div className={styles.prices}>
        <strong className={styles.price}>${currentPrice}</strong>

        {showOldPrice && oldPrice && oldPrice > currentPrice && (
          <span className={styles.oldPrice}>${oldPrice}</span>
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.option}>
          <p className={styles.optionTitle}>Screen</p>
          <p className={styles.optionValue}>{screen}</p>
        </div>

        <div className={styles.option}>
          <p className={styles.optionTitle}>Capacity</p>
          <p className={styles.optionValue}>{capacity}</p>
        </div>

        <div className={styles.option}>
          <p className={styles.optionTitle}>RAM</p>
          <p className={styles.optionValue}>{ram}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${button.cartButton} ${
            isAdded ? button.cartButton__added : ''
          }`}
          onClick={() =>
            isAdded ? removeFromCart(product.id) : addToCart(product)
          }
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={button.favouriteButton}
          onClick={() => toggleFavourite(product)}
        >
          <Icon
            name={favourite ? 'heart-like' : 'heart'}
            className={button.favouriteIcon}
          />
        </button>
      </div>
    </div>
  );
};
