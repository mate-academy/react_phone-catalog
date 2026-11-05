import React, { useContext } from 'react';
import styles from './ProductOptions.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';
import { NavLink } from 'react-router-dom';
import { COLORS } from '../../../../constants/colors';
import classNames from 'classnames';
import { Product } from '../../../../types/Product';
import { CartContext } from '../../../../store/CartContext';
import { FavoritesContext } from '../../../../store/FavoritesContext';

type Props = {
  productDetails: ProductDetails;
  product: Product;
};

// Product code is not in the API data, so a placeholder from the design is used
const PRODUCT_CODE = '802390';

export const ProductOptions: React.FC<Props> = ({
  productDetails,
  product,
}) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isInCart = cartItems.some(item => item.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

  return (
    <div className={styles.productOptions}>
      <div className={styles.productOptionsHeader}>
        <p className={styles.productOptionsLabel}>Available colors</p>
        <p className={styles.productOptionsLabel}>ID: {PRODUCT_CODE}</p>
      </div>

      <ul className={styles.productOptionsColors}>
        {productDetails.colorsAvailable.map(color => {
          const adressID =
            `${productDetails.namespaceId}-${productDetails.capacity}-${color}`
              .toLowerCase()
              .split(' ')
              .join('-');

          return (
            <li key={color}>
              <NavLink
                to={`/product/${adressID}`}
                aria-label={color}
                className={({ isActive }) =>
                  classNames(styles.productOptionsColor, {
                    [styles.productOptionsColorActive]: isActive,
                  })
                }
                style={{ backgroundColor: COLORS[color] }}
                state={{ keepScroll: true }}
              />
            </li>
          );
        })}
      </ul>

      <div className={styles.productOptionsSection}>
        <p className={styles.productOptionsLabel}>Select capacity</p>
        <ul className={styles.productOptionsCapacities}>
          {productDetails.capacityAvailable.map(capacity => {
            const adressCapacity =
              `${productDetails.namespaceId}-${capacity}-${productDetails.color}`
                .toLowerCase()
                .split(' ')
                .join('-');

            return (
              <li key={capacity}>
                <NavLink
                  to={`/product/${adressCapacity}`}
                  className={({ isActive }) =>
                    classNames(styles.productOptionsCapacity, {
                      [styles.productOptionsCapacityActive]: isActive,
                    })
                  }
                  state={{ keepScroll: true }}
                >
                  {capacity}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <div className={styles.productOptionsPrices}>
          <p className={styles.productOptionsPrice}>
            ${productDetails.priceDiscount}
          </p>
          <s className={styles.productOptionsFullPrice}>
            ${productDetails.priceRegular}
          </s>
        </div>
        <div className={styles.productOptionsActions}>
          <button
            type="button"
            className={classNames(styles.productOptionsAddButton, {
              [styles.productOptionsAddButtonActive]: isInCart,
            })}
            onClick={() => addToCart(product)}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            type="button"
            className={classNames(styles.productOptionsFavoriteButton, {
              [styles.productOptionsFavoriteButtonActive]: isFavorite,
            })}
            onClick={() => toggleFavorite(product)}
          >
            <span
              className={
                isFavorite
                  ? styles.productOptionsFavoriteIconActive
                  : styles.productOptionsFavoriteIcon
              }
            />
          </button>
        </div>
        <ul className={styles.productOptionsSpecs}>
          <li className={styles.productOptionsSpec}>
            <span className={styles.productOptionsSpecName}>Screen</span>
            <span>{productDetails.screen}</span>
          </li>
          <li className={styles.productOptionsSpec}>
            <span className={styles.productOptionsSpecName}>Resolution</span>
            <span>{productDetails.resolution}</span>
          </li>
          <li className={styles.productOptionsSpec}>
            <span className={styles.productOptionsSpecName}>Processor</span>
            <span>{productDetails.processor}</span>
          </li>
          <li className={styles.productOptionsSpec}>
            <span className={styles.productOptionsSpecName}>RAM</span>
            <span>{productDetails.ram}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
