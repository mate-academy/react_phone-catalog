import { Product } from '../../../../types/Product';
import { ProductDetails } from '../../../../types/ProductDetails';
import { useFavorites } from '../../../../context/FavoritesContext';
import { useCart } from '../../../../context/CartContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { getPublicPath } from '../../../../utils/getPublicPath';
import styles from './ProductOptions.module.scss';

interface Props {
  product: ProductDetails;
  summary: Product;
  variants: ProductDetails[];
  onSelectVariant: (productId: string) => void;
}

const colorValues: Record<string, string> = {
  black: '#1f2024',
  blue: '#4b88a2',
  coral: '#ff7f6a',
  gold: '#f6d0af',
  graphite: '#5b5b57',
  green: '#5f7170',
  midnight: '#232a31',
  midnightgreen: '#5f7170',
  pink: '#e8b4bc',
  purple: '#b7a5c8',
  red: '#ba0c2f',
  rosegold: '#e0bfb8',
  silver: '#f0f0f0',
  sierrablue: '#9bb5ce',
  skyblue: '#a7c1d9',
  spaceblack: '#25252a',
  spacegray: '#4c4c4c',
  starlight: '#f0e4d3',
  white: '#f0f0f0',
  yellow: '#f4e2ba',
};

const normalizeColor = (color: string) =>
  color.toLowerCase().replace(/[\s-]/g, '');

export const ProductOptions: React.FC<Props> = ({
  product,
  summary,
  variants,
  onSelectVariant,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const { t } = useLanguage();
  const isProductFavorite = isFavorite(summary.itemId);
  const isProductInCart = isInCart(summary.itemId);

  const chooseVariant = (color: string, capacity: string) => {
    const nextProduct = variants.find(
      variant =>
        normalizeColor(variant.color) === normalizeColor(color) &&
        variant.capacity === capacity,
    );

    if (nextProduct && nextProduct.id !== product.id) {
      onSelectVariant(nextProduct.id);
    }
  };

  return (
    <section className={styles.options} aria-label={t('product.options')}>
      <span className={styles.productId}>
        {t('product.id', { id: summary.id })}
      </span>

      <div className={styles.controls}>
        <fieldset className={styles.optionGroup}>
          <legend>{t('product.availableColors')}</legend>

          <div className={styles.colors}>
            {product.colorsAvailable.map(color => (
              <label
                key={color}
                className={styles.colorOption}
                title={color}
                style={
                  {
                    '--product-color':
                      colorValues[normalizeColor(color)] || '#c4c4c4',
                  } as React.CSSProperties
                }
              >
                <input
                  type="radio"
                  name="product-color"
                  value={color}
                  checked={
                    normalizeColor(product.color) === normalizeColor(color)
                  }
                  onChange={() => chooseVariant(color, product.capacity)}
                />
                <span className={styles.colorSwatch} aria-hidden="true" />
                <span className="visually-hidden">{color}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.optionGroup}>
          <legend>{t('product.selectCapacity')}</legend>

          <div className={styles.capacities}>
            {product.capacityAvailable.map(capacity => (
              <label key={capacity} className={styles.capacityOption}>
                <input
                  type="radio"
                  name="product-capacity"
                  value={capacity}
                  checked={product.capacity === capacity}
                  onChange={() => chooseVariant(product.color, capacity)}
                />
                <span className={styles.capacityLabel}>
                  {capacity.replace('GB', ' GB')}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.purchase}>
          <div className={styles.priceRow}>
            <span className={styles.price}>${summary.price}</span>
            {summary.fullPrice > summary.price && (
              <span className={styles.regularPrice}>${summary.fullPrice}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.addToCart} ${
                isProductInCart ? styles.addToCartSelected : ''
              }`}
              aria-pressed={isProductInCart}
              onClick={() => addToCart(summary)}
            >
              {t(isProductInCart ? 'product.addedToCart' : 'product.addToCart')}
            </button>
            <button
              type="button"
              className={`${styles.favorite} ${
                isProductFavorite ? styles.favoriteSelected : ''
              }`}
              aria-label={t(
                isProductFavorite
                  ? 'product.removeFavorite'
                  : 'product.addFavorite',
                { name: product.name },
              )}
              aria-pressed={isProductFavorite}
              onClick={() => toggleFavorite(summary.itemId)}
            >
              <img
                src={
                  isProductFavorite
                    ? getPublicPath('img/heart-filled.svg')
                    : getPublicPath('img/heart.svg')
                }
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>

          <dl className={styles.shortSpecs}>
            <div>
              <dt>{t('product.screen')}</dt>
              <dd>{product.screen}</dd>
            </div>
            <div>
              <dt>{t('product.resolution')}</dt>
              <dd>{product.resolution}</dd>
            </div>
            <div>
              <dt>{t('product.processor')}</dt>
              <dd>{product.processor}</dd>
            </div>
            <div>
              <dt>{t('product.ram')}</dt>
              <dd>{product.ram.replace('GB', ' GB')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
