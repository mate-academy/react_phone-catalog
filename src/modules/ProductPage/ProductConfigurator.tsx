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
  <div className={styles['product-configurator']}>
    <div className={styles['product-configurator__controls']}>
      {/* COLORS */}
      <div className={styles['product-configurator__color-container']}>
        <span className={styles['product-configurator__color-label']}>
          Available colors
        </span>

        <div className={styles['product-configurator__color-options']}>
          {product.colorsAvailable.map((color) => (
            <div
              key={color}
              className={classNames(
                styles['product-configurator__color-layout'],
                {
                  [styles['product-configurator__color-layout--active']]:
                    selectedColor === color,
                }
              )}
              onClick={() => updateSlug('color', color)}
            >
              <div
                className={styles['product-configurator__color-option']}
                style={{ backgroundColor: COLOR_MAP[normalizeValue(color)] }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CAPACITY */}
      <div className={styles['product-configurator__capacity-container']}>
        <span className={styles['product-configurator__capacity-label']}>
          Select capacity
        </span>

        <div className={styles['product-configurator__capacity-options']}>
          {product.capacityAvailable.map((capacity) => (
            <button
              key={capacity}
              className={classNames(
                styles['product-configurator__capacity-option'],
                {
                  [styles['product-configurator__capacity-option--active']]:
                    selectedCapacity === capacity,
                }
              )}
              onClick={() => updateSlug('capacity', capacity)}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className={styles['product-configurator__buy-section']}>
      {/* PRICE CONTAINER */}
      <div className={styles['product-configurator__price-container']}>
        <span className={styles['product-configurator__price-discount']}>
          ${product.priceDiscount}
        </span>
        <span
          className={styles['product-configurator__price-regular']}
          data-text={`$${product.priceRegular}`}
        >
          ${product.priceRegular}
        </span>
      </div>

      {/* ACTION BUTTONS */}
      <div className={styles['product-configurator__button-container']}>
        <Button
          onClick={handleCartClick}
          fullWidth
          variant={inCart ? 'outline' : 'primary'}
        >
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
        {/* <button
          className={classNames(styles['product-configurator__cart-button'], {
            [styles['product-configurator__cart-button--added']]: inCart,
          })}
          onClick={handleCartClick}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>
        */}
        <button
          className={styles['product-configurator__favorite-button']}
          onClick={handleFav}
        >
          <img
            src={fav ? 'img/icons/red-heart.svg' : 'img/icons/heart.svg'}
            alt="Favorite"
          />
        </button>
      </div>
    </div>

    <div className={styles['product-configurator__description']}>
      <div className={styles['product-configurator__description-item']}>
        <span className={styles['product-configurator__description-label']}>
          Screen
        </span>
        <span className={styles['product-configurator__description-value']}>
          {product.screen}
        </span>
      </div>

      <div className={styles['product-configurator__description-item']}>
        <span className={styles['product-configurator__description-label']}>
          Resolution
        </span>
        <span className={styles['product-configurator__description-value']}>
          {product.resolution}
        </span>
      </div>

      <div className={styles['product-configurator__description-item']}>
        <span className={styles['product-configurator__description-label']}>
          Processor
        </span>
        <span className={styles['product-configurator__description-value']}>
          {product.processor}
        </span>
      </div>

      <div className={styles['product-configurator__description-item']}>
        <span className={styles['product-configurator__description-label']}>
          RAM
        </span>
        <span className={styles['product-configurator__description-value']}>
          {product.ram}
        </span>
      </div>
    </div>
  </div>
);
};
