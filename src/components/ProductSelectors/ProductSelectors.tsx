import { Link } from 'react-router-dom';
import styles from './ProductSelectors.module.scss';
import { useCart } from '../../context/CartContext/CartContext';
// eslint-disable-next-line max-len
import { useFavorites } from '../../context/Favoritescontext/Favoritescontext';

const COLOR_MAP: Record<string, string> = {
  spacegray: '#535150',
  silver: '#e3e4e5',
  midnightgreen: '#4e5851',
  purple: '#bcb3d1',
  rosegold: '#fad6d1',
  coral: '#ff6f61',
  midnight: '#191970',
};

interface ProductSelectorsProps {
  product: {
    id: string;
    category: string;
    namespaceId: string;
    colorsAvailable: string[];
    color: string;
    capacityAvailable: string[];
    capacity: string;

    priceRegular: number;
    priceDiscount: number;
    screen: string;
    processor: string;
    ram: string;
  };
}

export const ProductSelectors = ({ product }: ProductSelectorsProps) => {
  const { isInCart, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isAdded = isInCart(product.id);
  const isLiked = isFavorite(product.id);

  const {
    namespaceId,
    colorsAvailable,
    color: currentColor,
    capacityAvailable,
    capacity: currentCapacity,
  } = product;

  return (
    <div className={styles.selectorsContainer}>
      <div className={styles.section}>
        <p className={styles.title}>Available colors</p>
        <div className={styles.colorsList}>
          {colorsAvailable.map(colorName => {
            const targetId = `${namespaceId}-${currentCapacity.toLowerCase()}-${colorName}`;
            const isActive = currentColor === colorName;

            const actualColor = COLOR_MAP[colorName] || colorName;

            return (
              <Link
                key={colorName}
                to={`/phones/${targetId}`}
                className={`${styles.colorCircle} ${isActive ? styles.activeColor : ''}`}
                style={{ backgroundColor: actualColor }}
                title={colorName}
                aria-label={`Color ${colorName}`}
              />
            );
          })}
        </div>
      </div>

      <hr className={styles.cardLine} />

      <div className={styles.section}>
        <p className={styles.title}>Select capacity</p>
        <div className={styles.capacityList}>
          {capacityAvailable.map(cap => {
            const targetId = `${namespaceId}-${cap.toLowerCase()}-${currentColor}`;
            const isActive = currentCapacity === cap;

            return (
              <Link
                key={cap}
                to={`/phones/${targetId}`}
                className={`${styles.capacityTab} ${isActive ? styles.activeCapacity : ''}`}
              >
                {cap}
              </Link>
            );
          })}
        </div>
      </div>

      <div className={styles.section}>
        <hr className={styles.cardLine} />

        <div className={styles.addCardPrice}>
          <div className={styles.priceContainer}>
            <span className={styles.priceDiscount}>
              {`$${product.priceDiscount}`}
            </span>

            {product.priceRegular !== product.priceDiscount && (
              <span className={styles.priceRegular}>
                {`$${product.priceRegular}`}
              </span>
            )}
          </div>

          <div className={styles.cardButton}>
            <button
              className={`${styles.addToCard} ${isAdded ? styles.added : ''}`}
              onClick={() => {
                if (!isAdded) {
                  addToCart(product.id);
                }
              }}
            >
              {isAdded ? 'Added to cart' : 'Add to cart'}
            </button>
            <img
              onClick={() => toggleFavorite(product.id)}
              src={
                isLiked
                  ? './img/icons/heart-filled.svg'
                  : './img/icons/heart.svg'
              }
              alt="Favorites"
              className={styles.cardHeart}
            />
          </div>
        </div>

        <div className={styles.specsContainer}>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Screen</span>
            <span className={styles.specValue}>
              {product.screen.split(' (')[0].trim()}
            </span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Capacity</span>
            <span className={styles.specValue}>{product.capacity}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Processor</span>
            <span className={styles.specValue}>{product.processor}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>RAM</span>
            <span className={styles.specValue}>{product.ram}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
