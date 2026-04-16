import styles from './ProductOptions.module.scss';
import { Product, ProductDetails } from '../../../../types/Product';
import { useShop } from '../../../../store/shop/ShopContext';
import { useTheme } from '../../../../store/theme/ThemeContext';
import { favouriteIconMap } from '../../../shared/config/favouriteIconMap';

type Props = {
  product: Product;
  productDetails: ProductDetails;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
};

const colorMap: Record<string, string> = {
  black: '#1f2024',
  green: '#5f7170',
  yellow: '#ffe681',
  white: '#f5f5f5',
  purple: '#d6c4e9',
  red: '#ba0c2f',
  spacegray: '#535150',
  midnightgreen: '#4e5851',
  gold: '#f7e0c9',
  silver: '#e3e4e5',
  rosegold: '#f9d9d4',
  coral: '#ff6f61',
  midnight: '#1d2d5a',
  spaceblack: '#4a4a4a',
  blue: '#215e7c',
  pink: '#f9d3dc',
  graphite: '#5f5f5f',
  sierrablue: '#a7c1d9',
};

export const ProductOptions: React.FC<Props> = ({
  product,
  productDetails,
  onColorChange,
  onCapacityChange,
}) => {
  const { toggleFavourite, addToCart, favourites, carts } = useShop();
  const { theme } = useTheme();
  const isFavourite = favourites.some(item => item.itemId === product.itemId);
  const isCart = carts.some(cart => cart.product.itemId === product.itemId);

  return (
    <>
      <div className={styles.section}>
        <div className={styles.header}>
          <p className={styles.title}>Available colors</p>
          <span className={styles.productId}>
            {`ID: ${productDetails.namespaceId}`}
          </span>
        </div>
        <div className={styles.inner}>
          <div className={styles.colors}>
            {productDetails.colorsAvailable.map(color => (
              <button
                key={color}
                type="button"
                className={`${styles.colorButton} ${productDetails.color === color ? styles.active : ''}`}
                onClick={() => onColorChange(color)}
              >
                <span
                  className={styles.colorCircle}
                  style={{ backgroundColor: colorMap[color] }}
                />
              </button>
            ))}
          </div>

          <div className={`${styles.sect} ${styles.margin}`}>
            <p className={styles.sectionTitle}>Select capacity</p>
            <div className={styles.capacityList}>
              {productDetails.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  type="button"
                  className={`${styles.capacityButton} ${capacity === productDetails.capacity ? styles.capacityButtonActive : ''}`}
                  onClick={() => onCapacityChange(capacity)}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.price}>
              <span className={styles.currentPrice}>
                ${productDetails.priceDiscount}
              </span>
              <span className={styles.oldPrice}>
                ${productDetails.priceRegular}
              </span>
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                className={`${isCart ? styles.selected : styles.addToCart}`}
                onClick={() => addToCart(product)}
                disabled={isCart}
              >
                {isCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                type="button"
                className={`${styles.favouriteButton} ${
                  isFavourite ? styles.favouriteButtonActive : ''
                }`}
                aria-label="Add to favourites"
                onClick={() => toggleFavourite(product)}
              >
                <img
                  src={
                    isFavourite
                      ? favouriteIconMap[theme].active
                      : favouriteIconMap[theme].default
                  }
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{productDetails.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>
                {productDetails.resolution}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>
                {productDetails.processor}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{productDetails.ram}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
