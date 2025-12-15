import styles from './ProductPage.module.scss';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

import { ProductDetails } from '@/types/ProductDetails';
import { Product } from '@/types/Product';
import { useCart } from '@/modules/CartFavContext/CartContext';
import { COLOR_MAP } from '../shared/components/utils/constants/constants';
import { Button } from '@/components/ui/button/Button';

type ProductConfiguratorProps = {
  product?: ProductDetails;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  selectedCapacity: string;
  setSelectedCapacity: React.Dispatch<React.SetStateAction<string>>;
  foundProductFromProducts: Product | undefined;
};

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedCapacity,
  setSelectedCapacity,
  foundProductFromProducts,
}) => {
  const navigate = useNavigate();
  const { category, productSlug } = useParams();

  const {
    isFavorite,
    isInCart,
    addToFavorites,
    removeFromFavorites,
    addToCart,
  } = useCart();

  if (!product) {
    return null;
  }

  const normalizeValue = (color: string): string => {
    return color.replace(' ', '-').toLowerCase();
  };

  // --- ROUTE SLUG UPDATER (color / capacity) ---
  const updateSlug = (type: 'color' | 'capacity', value: string) => {
    if (!productSlug || !category) {
      return;
    }

    // do nothing if user selects same option
    if (type === 'color' && value === selectedColor) {
      return;
    }

    if (type === 'capacity' && value === selectedCapacity) {
      return;
    }

    const normalizedValue = normalizeValue(value);
    const oldPart = normalizeValue(product[type]).toLowerCase();
    const newSlug = productSlug.replace(oldPart, normalizedValue);

    if (type === 'color') {
      setSelectedColor(value);
    }

    if (type === 'capacity') {
      setSelectedCapacity(value);
    }

    navigate(`/${category}/${newSlug}`);
  };

  // --- FAV + CART STATES FROM CONTEXT ---
  const fav = isFavorite(foundProductFromProducts?.itemId || '');
  const inCart = isInCart(foundProductFromProducts?.itemId || '');

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!foundProductFromProducts) {
      return;
    }

    addToCart(foundProductFromProducts?.itemId || '');
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!foundProductFromProducts) {
      return;
    }

    if (fav) {
      removeFromFavorites(foundProductFromProducts?.itemId || '');
    } else {
      addToFavorites(foundProductFromProducts.itemId);
    }
  };

  return (
    <div className={styles.productConfigurator}>
      <div className={styles.productConfigurator__controls}>
        {/* COLORS */}
        <div className={styles.productConfigurator__colorContainer}>
          <span className={styles.productConfigurator__colorLabel}>
            Available colors
          </span>

          <div className={styles.productConfigurator__colorOptions}>
            {product.colorsAvailable.map(color => (
              <div
                key={color}
                className={classNames(styles.productConfigurator__colorLayout, {
                  [styles['productConfigurator__colorLayout--active']]:
                    selectedColor === color,
                })}
                onClick={() => updateSlug('color', color)}
              >
                <div
                  className={styles.productConfigurator__colorOption}
                  style={{ backgroundColor: COLOR_MAP[normalizeValue(color)] }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CAPACITY */}
        <div className={styles.productConfigurator__capacityContainer}>
          <span className={styles.productConfigurator__capacityLabel}>
            Select capacity
          </span>

          <div className={styles.productConfigurator__capacityOptions}>
            {product.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                className={classNames(
                  styles.productConfigurator__capacityOption,
                  {
                    [styles['productConfigurator__capacityOption--active']]:
                      selectedCapacity === capacity,
                  },
                )}
                onClick={() => updateSlug('capacity', capacity)}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.productConfigurator__buySection}>
        {/* PRICE CONTAINER */}
        <div className={styles.productConfigurator__priceContainer}>
          <span className={styles.productConfigurator__priceDiscount}>
            ${product.priceDiscount}
          </span>
          <span
            className={styles.productConfigurator__priceRegular}
            data-text={`$${product.priceRegular}`} // <--- Додаємо цей атрибут
          >
            ${product.priceRegular}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className={styles.productConfigurator__buttonContainer}>
          <Button
            onClick={handleCartClick}
            fullWidth
            variant={inCart ? 'outline' : 'primary'}
          >
            {inCart ? 'Added to Cart' : 'Add to Cart'}
          </Button>
          {/* <button
            className={classNames(styles.productConfigurator__cartButton, {
              [styles['productConfigurator__cartButton--added']]: inCart,
            })}
            onClick={handleCartClick}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </button> */}
          <button
            className={styles.productConfigurator__favoriteButton}
            onClick={handleFav}
          >
            <img
              src={fav ? 'img/icons/red-heart.svg' : 'img/icons/heart.svg'}
              alt="Favorite"
            />
          </button>
        </div>
      </div>
      <div className={styles.productConfigurator__description}>
        <div className={styles.productConfigurator__descriptionItem}>
          <span className={styles.productConfigurator__descriptionLabel}>
            Screen
          </span>
          <span className={styles.productConfigurator__descriptionValue}>
            {product.screen}
          </span>
        </div>

        <div className={styles.productConfigurator__descriptionItem}>
          <span className={styles.productConfigurator__descriptionLabel}>
            Resolution
          </span>
          <span className={styles.productConfigurator__descriptionValue}>
            {product.resolution}
          </span>
        </div>

        <div className={styles.productConfigurator__descriptionItem}>
          <span className={styles.productConfigurator__descriptionLabel}>
            Processor
          </span>
          <span className={styles.productConfigurator__descriptionValue}>
            {product.processor}
          </span>
        </div>

        <div className={styles.productConfigurator__descriptionItem}>
          <span className={styles.productConfigurator__descriptionLabel}>
            RAM
          </span>
          <span className={styles.productConfigurator__descriptionValue}>
            {product.ram}
          </span>
        </div>
      </div>
    </div>
  );
};
