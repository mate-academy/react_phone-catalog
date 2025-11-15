import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../../../types';
import { useCart } from '../../../../contexts/CartContext';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import { api } from '../../../../utils/api';
import styles from './ProductInfo.module.scss';

const colorCssMap: { [key: string]: string } = {
  spacegray: '#888B8D',
  midnightgreen: '#5f7170',
  rosegold: '#B76E79',
  silver: '#F0F0F0',
  sierrablue: '#7287A5',
  graphite: '#474A4F',
  black: '#4c4c4c',
  white: '#FFFFFF',
  red: '#FF0000',
  gold: '#fcdbc1',
  purple: '#905bff',
};

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductInfo: React.FC<Props> = ({ product, showDiscount }) => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const cartItem = cartState.items.find(item => item.product.id === product.id);
  const isInCart = !!cartItem;
  const isInFavorites = favoritesState.items.some(
    item => item.product.id === product.id,
  );

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await api.getProducts();

        setAllProducts(products);
      } catch (error) {}
    };

    fetchAllProducts();
  }, []);

  const handleToggleCart = () => {
    if (isInCart && cartItem) {
      cartDispatch({
        type: 'REMOVE_ITEM',
        payload: cartItem.id,
      });
    } else {
      cartDispatch({
        type: 'ADD_ITEM',
        payload: product,
      });
    }
  };

  const handleToggleFavorite = () => {
    if (isInFavorites) {
      favoritesDispatch({
        type: 'REMOVE_FAVORITE',
        payload: product.id,
      });
    } else {
      favoritesDispatch({
        type: 'ADD_FAVORITE',
        payload: product,
      });
    }
  };

  const availableColors = product.colorsAvailable || [product.color];
  const availableCapacities = product.capacityAvailable || [product.capacity];
  const hasDiscount = showDiscount ?? product.fullPrice > product.price;

  const findProductVariant = (
    color: string,
    capacity: string,
  ): string | null => {
    const variant = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === color &&
        p.capacity === capacity,
    );

    return variant ? variant.id : null;
  };

  const additionalTechSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    {
      label: 'Cell',
      value: product.cell
        ? Array.isArray(product.cell)
          ? product.cell.join(', ')
          : product.cell
        : undefined,
    },
  ].filter(spec => spec.value);

  return (
    <div className={styles.productInfo}>
      {/* Color Selection */}
      {availableColors.length > 0 && (
        <div className={styles.productInfo__section}>
          <h3 className={styles.productInfo__sectionTitle}>Available colors</h3>
          <div className={styles.productInfo__colors}>
            {availableColors.map(color => {
              const variantId = findProductVariant(color, product.capacity);
              const cssColor =
                colorCssMap[color.toLowerCase()] || color.toLowerCase();

              return variantId ? (
                <Link
                  key={color}
                  to={`/product/${variantId}`}
                  className={classNames(styles.productInfo__color, {
                    [styles.productInfo__color_active]: color === product.color,
                  })}
                  style={{ backgroundColor: cssColor }}
                  title={color}
                />
              ) : (
                <button
                  key={color}
                  className={classNames(styles.productInfo__color, {
                    [styles.productInfo__color_active]: color === product.color,
                  })}
                  style={{ backgroundColor: cssColor }}
                  title={color}
                  disabled
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Capacity Selection */}
      {availableCapacities.length > 0 && (
        <div className={styles.productInfo__section}>
          <h3 className={styles.productInfo__sectionTitle}>Select capacity</h3>
          <div className={styles.productInfo__capacities}>
            {availableCapacities.map(capacity => {
              const variantId = findProductVariant(product.color, capacity);

              return variantId ? (
                <Link
                  key={capacity}
                  to={`/product/${variantId}`}
                  className={classNames(styles.productInfo__capacity, {
                    [styles.productInfo__capacity_active]:
                      capacity === product.capacity,
                  })}
                >
                  {capacity}
                </Link>
              ) : (
                <button
                  key={capacity}
                  className={classNames(styles.productInfo__capacity, {
                    [styles.productInfo__capacity_active]:
                      capacity === product.capacity,
                  })}
                  disabled
                >
                  {capacity}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className={styles.productInfo__prices}>
        <span className={styles.productInfo__price}>${product.price}</span>
        {hasDiscount && (
          <span className={styles.productInfo__fullPrice}>
            ${product.fullPrice}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className={styles.productInfo__actions}>
        <button
          className={classNames(styles.productInfo__cartBtn, {
            [styles.productInfo__cartBtn_added]: isInCart,
          })}
          onClick={handleToggleCart}
        >
          {isInCart ? 'Remove from cart' : 'Add to cart'}
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
                ? '/react_phone-catalog/img/icons/icon-red-heart.png'
                : '/react_phone-catalog/img/icons/heart.png'
            }
            alt="Heart"
          />
        </button>
      </div>

      {/* Additional Tech Specs under the button */}
      {additionalTechSpecs.length > 0 && (
        <div className={styles.productInfo__additionalSpecs}>
          <div className={styles.productInfo__specs}>
            {additionalTechSpecs.map((spec, index) => (
              <div key={index} className={styles.productInfo__spec}>
                <span className={styles.productInfo__specName}>
                  {spec.label}
                </span>
                <span className={styles.productInfo__specValue}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
