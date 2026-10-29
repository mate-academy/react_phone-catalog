import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import type { Product } from '../../types/Product';
import type { ProductDetails } from '../../types/ProductDetails';
import { formatMemory } from '../../utils/formatMemory';
import styles from './ProductOptions.module.scss';

const COLORS: Record<string, string> = {
  black: '#1F2020',
  green: '#AEE1CD',
  yellow: '#FFE681',
  white: '#F9F6EF',
  purple: '#D1CDDA',
  red: '#BA0C2E',
  spacegray: '#535150',
  midnightgreen: '#4E5851',
  gold: '#F9E5C9',
  silver: '#EBEBE3',
  rosegold: '#E6C7C2',
  coral: '#F4846F',
  midnight: '#232A31',
  spaceblack: '#403E3C',
  blue: '#A7C1D9',
  pink: '#FAD1CF',
  graphite: '#4D4F4E',
  sierrablue: '#9BB5CE',
};

interface Props {
  product: ProductDetails;
  listItem: Product;
}

export const ProductOptions = ({ product, listItem }: Props) => {
  const navigate = useNavigate();

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const isLiked = isFavorite(listItem.itemId);
  const isAdded = isInCart(listItem.itemId);

  const goToVariant = (capacity: string, color: string) => {
    navigate(
      `/product/${product.namespaceId}-${capacity.toLowerCase()}-${color}`,
    );
  };

  const shortSpecs = [
    { name: 'Screen', value: product.screen },
    { name: 'Resolution', value: product.resolution },
    { name: 'Processor', value: product.processor },
    { name: 'RAM', value: formatMemory(product.ram) },
  ];

  return (
    <div className={styles.options}>
      <fieldset className={styles.group}>
        <legend className={styles.legend}>Available colors</legend>

        <div className={styles.row}>
          {product.colorsAvailable.map(color => (
            <label key={color} className={styles.swatch} title={color}>
              <input
                type="radio"
                name="color"
                value={color}
                className={styles.input}
                checked={color === product.color}
                onChange={() => goToVariant(product.capacity, color)}
              />
              <span
                className={styles.swatchColor}
                style={{ backgroundColor: COLORS[color] || '#E2E6E9' }}
              />

              <span className={styles.visuallyHidden}>{color}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Select capacity</legend>

        <div className={styles.row}>
          {product.capacityAvailable.map(capacity => (
            <label key={capacity} className={styles.capacity}>
              <input
                type="radio"
                name="capacity"
                value={capacity}
                className={styles.input}
                checked={capacity === product.capacity}
                onChange={() => goToVariant(capacity, product.color)}
              />
              <span className={styles.capacityText}>
                {formatMemory(capacity)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className={styles.prices}>
        <span className={styles.price}>${product.priceDiscount}</span>
        <span className={styles.fullPrice}>${product.priceRegular}</span>
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={
            isAdded
              ? `${styles.addButton} ${styles.addButtonAdded}`
              : styles.addButton
          }
          disabled={isAdded}
          onClick={() => addToCart(listItem)}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={styles.favoriteButton}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isLiked}
          onClick={() => toggleFavorite(listItem)}
        >
          <img
            src={isLiked ? 'img/icons/heart-like.svg' : 'img/icons/heart.svg'}
            alt=""
            width="16"
            height="16"
          />
        </button>
      </div>

      <dl className={styles.specs}>
        {shortSpecs.map(spec => (
          <div key={spec.name} className={styles.spec}>
            <dt className={styles.specName}>{spec.name}</dt>
            <dd className={styles.specValue}>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
