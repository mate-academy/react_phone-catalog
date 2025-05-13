import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductPurchasePanel.module.scss';
import { Product, ProductData } from '../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { cartSlice } from '../../../../store/slices/cart';
import { favoritesSlice } from '../../../../store/slices/favorites';

interface Props {
  product: ProductData;
  allProducts: Product[];
  categoryProducts: ProductData[];
}

export const ProductPurchasePanel: React.FC<Props> = ({
  product,
  allProducts,
  categoryProducts,
}) => {
  const dispatch = useAppDispatch();
  const productItem = allProducts.find(item => item.itemId === product.id);
  const cart: Product[] = useAppSelector(state => state.cart);
  const isInCart = cart.find(
    (item: Product) => item.id === (productItem ? productItem.id : 0),
  );
  const favorites: Product[] = useAppSelector(state => state.favorites);
  const isFavorite = favorites.find(
    (item: Product) => item.id === (productItem ? productItem.id : 0),
  );
  const getColorLink = (color: string) => {
    const productToLink: ProductData | undefined = categoryProducts.find(
      (item: ProductData) =>
        item.color.replace(/ /g, '-') === color &&
        item.capacity === product.capacity &&
        item.category === product.category &&
        item.namespaceId === product.namespaceId,
    );

    return productToLink ? `/${product.category}/${productToLink.id}` : '#';
  };

  const getCapacityLink = (capacity: string) => {
    return `/${product.category}/${product.id.replace(
      product.capacity.toLowerCase(),
      capacity.toLowerCase(),
    )}`;
  };

  const colorsAvailable = () => {
    return product.colorsAvailable.map(color => color.replace(/ /g, '-')) || [];
  };

  const getItemId = () => {
    return productItem?.id ?? 0;
  };

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(cartSlice.actions.remove(productItem));

      return;
    }

    dispatch(cartSlice.actions.add(productItem));
  };

  const handleAddToFavourite = () => {
    if (isFavorite) {
      dispatch(favoritesSlice.actions.remove(productItem));

      return;
    }

    dispatch(favoritesSlice.actions.add(productItem));
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panel__id}>ID: {getItemId()}</div>

      <div className={styles.panel__section}>
        <h4 className={styles['panel__section-title']}>Available colors</h4>
        <div className={styles['panel__color-picker']}>
          {colorsAvailable().map((color, index) => (
            <Link
              to={getColorLink(color)}
              key={index}
              className={classNames(styles['panel__color-option'], {
                [styles['panel__color-option--active']]:
                  product.color.replace(/ /g, '-') === color,
              })}
              style={{ background: color }}
            >
              <div className={styles['panel__color-option-inner']}></div>
            </Link>
          ))}
        </div>
      </div>

      <div className={classNames('divider', styles.panel__divider)}></div>

      <div className={styles.panel__section}>
        <h4 className={styles['panel__section-title']}>Select capacity</h4>
        <div className={styles['panel__capacity-options']}>
          {product.capacityAvailable.map((capacity, index) => (
            <Link
              to={getCapacityLink(capacity)}
              key={index}
              className={classNames(styles['panel__capacity-option'], {
                [styles['panel__capacity-option--active']]:
                  product.capacity === capacity,
              })}
            >
              {capacity}
            </Link>
          ))}
        </div>
      </div>

      <div className={classNames('divider', styles.panel__divider)}></div>

      <div className={styles['panel__price-section']}>
        <span className={styles['panel__price--discounted']}>
          ${product.priceDiscount}
        </span>
        <span className={styles['panel__price--regular']}>
          ${product.priceRegular}
        </span>
      </div>

      <div className={styles.panel__actions}>
        <button
          className={classNames(
            styles['panel__action-button'],
            styles['panel__action-button--add-to-cart'],
            {
              [styles['panel__action-button--selected']]: isInCart,
            },
          )}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={classNames(
            styles['panel__action-button'],
            styles['panel__action-button--favorite'],
          )}
          onClick={handleAddToFavourite}
        >
          {isFavorite ? (
            <img src="./icons/heart-filled.svg" alt="Filled Heart" />
          ) : (
            <img src="./icons/Favourites.png" alt="Empty Heart" />
          )}
        </button>
      </div>

      <ul className={styles['panel__specs-summary']}>
        <li className={styles['panel__spec-item']}>
          <span className={styles['panel__spec-name']}>Screen</span>
          <span className={styles['panel__spec-value']}>{product.screen}</span>
        </li>
        <li className={styles['panel__spec-item']}>
          <span className={styles['panel__spec-name']}>Capacity</span>
          <span className={styles['panel__spec-value']}>
            {product.capacity}
          </span>
        </li>
        <li className={styles['panel__spec-item']}>
          <span className={styles['panel__spec-name']}>Processor</span>
          <span className={styles['panel__spec-value']}>
            {product.processor}
          </span>
        </li>
        <li className={styles['panel__spec-item']}>
          <span className={styles['panel__spec-name']}>RAM</span>
          <span className={styles['panel__spec-value']}>{product.ram}</span>
        </li>
      </ul>
    </div>
  );
};
