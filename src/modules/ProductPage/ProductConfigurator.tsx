import { ProductDetails } from '@/types/ProductDetails';
import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  addToCart,
  getCart,
  getFavorites,
  removeFromCart,
  toggleFavorite,
} from '../shared/components/utils/StorageHelper/storageHelper';
import { Product } from '@/types/Product';

type ProductConfiguratorProps = {
  product?: ProductDetails;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
  setSelectedCapacity: React.Dispatch<React.SetStateAction<string>>;
  selectedCapacity: string;
  foundProductFromProducts: Product | undefined;
};

const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  product,
  setSelectedColor,
  selectedColor,
  setSelectedCapacity,
  selectedCapacity,
  foundProductFromProducts,
}) => {
  const { category, productSlug } = useParams();
  const navigate = useNavigate();

  const updateSlug = (type: 'color' | 'capacity', value: string) => {
    if (!product) return;
    if (selectedColor === value && type === 'color') return;
    if (selectedCapacity === value && type === 'capacity') return;

    const oldPart = product[type]; // product.color або product.capacity
    const newSlug = productSlug?.replace(
      oldPart.toLowerCase(),
      value.toLowerCase(),
    );

    if (type === 'color') {
      setSelectedColor(value);
    }

    if (type === 'capacity') {
      setSelectedCapacity(value);
    }

    navigate(`/${category}/${newSlug}`);
  };

  const [isFav, setIsFav] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const favs = getFavorites();
    const cartItems = getCart();

    setIsFav(favs.includes(foundProductFromProducts?.id));
    setIsInCart(
      cartItems.some(
        (cartItem: Product) => cartItem.id === foundProductFromProducts?.id,
      ),
    );
  }, []);
  console.log(isInCart);

  const handleFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(foundProductFromProducts?.id);
    setIsFav(!isFav); // Оновлюємо кнопку візуально
  };

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(foundProductFromProducts?.id); // Видаляємо
      setIsInCart(false); // Миттєво оновлюємо вигляд кнопки
    } else {
      addToCart(foundProductFromProducts); // Додаємо
      setIsInCart(true); // Миттєво оновлюємо вигляд кнопки
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
            {product?.colorsAvailable.map(color => (
              <div
                key={color}
                className={classNames(styles.productConfigurator__colorLayout, {
                  [styles.productConfigurator__colorLayout_active]:
                    selectedColor === color,
                })}
                onClick={() => updateSlug('color', color)}
              >
                <div
                  className={styles.productConfigurator__colorOption}
                  style={{ backgroundColor: color }}
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
            {product?.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                className={classNames(
                  styles.productConfigurator__capacityOption,
                  {
                    [styles.productConfigurator__capacityOption_active]:
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
        
           {/* BUTTONS */}
        <div className={styles.productConfigurator__buttonContainer}>
          <button
            onClick={handleCartClick}
            className={classNames(styles.productConfigurator__cartButton, {
              [styles.productConfigurator__cartButton_added]: isInCart,
            })}
          >
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </button>

          <button
            onClick={handleFav}
            className={styles.productConfigurator__favoriteButton}
          >
            <img
              src={isFav ? 'img/icons/red-heart.svg' : 'img/icons/heart.svg'}
              alt="Add to Favorites"
            />
          </button>
        </div>
      </div>

      {/* PRICE + ACTIONS — must use only existing classes */}
    </div>
  );
};

export default ProductConfigurator;
