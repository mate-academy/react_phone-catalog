import React, { useState } from 'react';
import classNames from 'classnames';
import { ProductDetails } from '../../../../types';
import { useCart } from '../../../../contexts/CartContext';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import styles from './ProductInfo.module.scss';

interface Props {
  product: ProductDetails;
}

export const ProductInfo: React.FC<Props> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product.capacity);

  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();

  const isInCart = cartState.items.some(item => item.product.id === product.id);
  const isInFavorites = favoritesState.items.some(
    item => item.product.id === product.id,
  );

  const handleAddToCart = () => {
    if (!isInCart) {
      // Convert ProductDetails to Product for cart
      const cartProduct = {
        id: product.id,
        itemId: product.id,
        name: product.name,
        fullPrice: product.priceRegular,
        price: product.priceDiscount,
        screen: product.screen,
        capacity: selectedCapacity,
        color: selectedColor,
        ram: product.ram,
        year: new Date().getFullYear(), // Fallback
        image: product.images[0] || '',
        category: product.namespaceId as 'phones' | 'tablets' | 'accessories',
      };

      cartDispatch({ type: 'ADD_ITEM', payload: cartProduct });
    }
  };

  const handleToggleFavorite = () => {
    const cartProduct = {
      id: product.id,
      itemId: product.id,
      name: product.name,
      fullPrice: product.priceRegular,
      price: product.priceDiscount,
      screen: product.screen,
      capacity: selectedCapacity,
      color: selectedColor,
      ram: product.ram,
      year: new Date().getFullYear(),
      image: product.images[0] || '',
      category: product.namespaceId as 'phones' | 'tablets' | 'accessories',
    };

    if (isInFavorites) {
      const favoriteItem = favoritesState.items.find(
        item => item.product.id === product.id,
      );

      if (favoriteItem) {
        favoritesDispatch({
          type: 'REMOVE_FAVORITE',
          payload: favoriteItem.id,
        });
      }
    } else {
      favoritesDispatch({ type: 'ADD_FAVORITE', payload: cartProduct });
    }
  };

  const discount = product.priceRegular - product.priceDiscount;

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.productInfo__title}>{product.name}</h1>

      <div className={styles.productInfo__prices}>
        <span className={styles.productInfo__price}>
          ${product.priceDiscount}
        </span>
        {discount > 0 && (
          <span className={styles.productInfo__fullPrice}>
            ${product.priceRegular}
          </span>
        )}
      </div>

      {/* Color Selection */}
      <div className={styles.productInfo__section}>
        <h3 className={styles.productInfo__sectionTitle}>Available colors</h3>
        <div className={styles.productInfo__colors}>
          {product.colorsAvailable.map(color => (
            <button
              key={color}
              className={classNames(styles.productInfo__color, {
                [styles.productInfo__color_active]: color === selectedColor,
              })}
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: color.toLowerCase() }}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>
      </div>

      {/* Capacity Selection */}
      <div className={styles.productInfo__section}>
        <h3 className={styles.productInfo__sectionTitle}>Select capacity</h3>
        <div className={styles.productInfo__capacities}>
          {product.capacityAvailable.map(capacity => (
            <button
              key={capacity}
              className={classNames(styles.productInfo__capacity, {
                [styles.productInfo__capacity_active]:
                  capacity === selectedCapacity,
              })}
              onClick={() => setSelectedCapacity(capacity)}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.productInfo__actions}>
        <button
          className={classNames(styles.productInfo__cartBtn, {
            [styles.productInfo__cartBtn_added]: isInCart,
          })}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={classNames(styles.productInfo__favoriteBtn, {
            [styles.productInfo__favoriteBtn_active]: isInFavorites,
          })}
          onClick={handleToggleFavorite}
          aria-label={
            isInFavorites ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          <img
            src={
              isInFavorites
                ? '/img/icons/icon-red-heart.png'
                : '/img/icons/heart.png'
            }
            alt="Heart"
          />
        </button>
      </div>

      {/* Specs */}
      <div className={styles.productInfo__specs}>
        <div className={styles.productInfo__spec}>
          <span className={styles.productInfo__specName}>Screen</span>
          <span className={styles.productInfo__specValue}>
            {product.screen}
          </span>
        </div>
        <div className={styles.productInfo__spec}>
          <span className={styles.productInfo__specName}>Resolution</span>
          <span className={styles.productInfo__specValue}>
            {product.resolution}
          </span>
        </div>
        <div className={styles.productInfo__spec}>
          <span className={styles.productInfo__specName}>Processor</span>
          <span className={styles.productInfo__specValue}>
            {product.processor}
          </span>
        </div>
        <div className={styles.productInfo__spec}>
          <span className={styles.productInfo__specName}>RAM</span>
          <span className={styles.productInfo__specValue}>{product.ram}</span>
        </div>
      </div>

      {/* Description */}
      {product.description && product.description.length > 0 && (
        <div className={styles.productInfo__about}>
          <h2 className={styles.productInfo__aboutTitle}>About</h2>
          {product.description.map((section, index) => (
            <div key={index} className={styles.productInfo__aboutSection}>
              <h3 className={styles.productInfo__aboutSectionTitle}>
                {section.title}
              </h3>
              {section.text.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.productInfo__aboutText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
