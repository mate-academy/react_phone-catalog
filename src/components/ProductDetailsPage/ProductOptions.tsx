import { Product, ProductDetails } from '../../types/Product';
import { Icon } from '../Icon';
import styles from './ProductDetailsPage.module.scss';

const colorValues: Record<string, string> = {
  black: '#202020',
  blue: '#3573a6',
  coral: '#f47e69',
  gold: '#e8d2b4',
  graphite: '#5b5b59',
  green: '#9fc8b3',
  midnight: '#252e37',
  midnightgreen: '#52635d',
  pink: '#f5d0d7',
  purple: '#c6bfdc',
  red: '#cc2638',
  rosegold: '#e6c2bd',
  sierrablue: '#a7bed1',
  silver: '#e2e3e5',
  skyblue: '#adc9d7',
  spaceblack: '#343435',
  spacegray: '#67686d',
  starlight: '#f2e9dc',
  white: '#f6f4ef',
  yellow: '#f4dc77',
};

const normalizeColor = (color: string) =>
  color.toLowerCase().replace(/[\s-]/g, '');

interface Props {
  details: ProductDetails;
  product: Product;
  isInCart: boolean;
  isFavorite: boolean;
  findVariant: (capacity: string, color: string) => ProductDetails | undefined;
  onSelectVariant: (capacity: string, color: string) => void;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  summarySpecs: string[][];
}

export const ProductOptions = ({
  details,
  product,
  isInCart,
  isFavorite,
  findVariant,
  onSelectVariant,
  onAddToCart,
  onToggleFavorite,
  summarySpecs,
}: Props) => (
  <div className={styles.options}>
    <p className={styles.productId}>ID: {product.itemId}</p>
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Available colors</legend>
      <div className={styles.colors}>
        {details.colorsAvailable.map(color => (
          <label className={styles.colorOption} key={color}>
            <input
              className="visually-hidden"
              type="radio"
              name="product-color"
              value={color}
              checked={normalizeColor(details.color) === normalizeColor(color)}
              disabled={!findVariant(details.capacity, color)}
              onChange={() => onSelectVariant(details.capacity, color)}
            />
            <span
              className={styles.colorSwatch}
              style={{
                backgroundColor: colorValues[normalizeColor(color)] || color,
              }}
              title={color}
            />
            <span className="visually-hidden">{color}</span>
          </label>
        ))}
      </div>
    </fieldset>

    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Select capacity</legend>
      <div className={styles.capacities}>
        {details.capacityAvailable.map(capacity => (
          <label className={styles.capacityOption} key={capacity}>
            <input
              className="visually-hidden"
              type="radio"
              name="product-capacity"
              value={capacity}
              checked={details.capacity === capacity}
              disabled={!findVariant(capacity, details.color)}
              onChange={() => onSelectVariant(capacity, details.color)}
            />
            <span>{capacity}</span>
          </label>
        ))}
      </div>
    </fieldset>

    <div className={styles.prices}>
      <strong>${product.price}</strong>
      {product.fullPrice > product.price && <del>${product.fullPrice}</del>}
    </div>
    <div className={styles.actions}>
      <button
        type="button"
        className={`primary-button ${isInCart ? styles.added : ''}`}
        aria-pressed={isInCart}
        onClick={() => {
          if (!isInCart) {
            onAddToCart();
          }
        }}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        type="button"
        className={`icon-button ${styles.favorite} ${
          isFavorite ? styles.favoriteActive : ''
        }`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={isFavorite}
        onClick={onToggleFavorite}
      >
        <Icon name="heart" filled={isFavorite} />
      </button>
    </div>
    <dl className={styles.specList}>
      {summarySpecs.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  </div>
);
