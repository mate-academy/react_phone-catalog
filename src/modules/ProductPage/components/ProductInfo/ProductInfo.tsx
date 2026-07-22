import { FC } from 'react';
import { Product, ProductDetails } from '../../../shared/types/Product';
import styles from './ProductInfo.module.scss';
import { productColors } from '../../../../constants/productColors';
import { AddToCartButton } from '../../../shared/components/AddToCartButton';
import { FavoriteButton } from '../../../shared/components/FavoriteButton';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useShop } from '../../../../context/ShopContext';

type Props = {
  product: Product;
  productDetails: ProductDetails;
};

const getProductPath = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  const normalizedColor = color.replaceAll(' ', '-');

  return `/product/${namespaceId}-${capacity}-${normalizedColor}`.toLowerCase();
};

export const ProductInfo: FC<Props> = ({ productDetails, product }) => {
  const { addToCart, removeFromCart, isInCart, isFavorite, toggleFavorite } =
    useShop();
  const isProductInCart = isInCart(product.id);
  const isProductFavorite = isFavorite(product.id);

  return (
    <section className={styles.info}>
      <div className={styles.info__section}>
        <p className={styles.info__label}>Available colors</p>
        <span className={styles.info__productId}>ID: {product.id}</span>
        <div className={styles.info__options}>
          {productDetails.colorsAvailable.map(color => {
            const normalizedColor = color
              .replaceAll(' ', '')
              .replaceAll('-', '')
              .toLowerCase();

            return (
              <Link
                to={getProductPath(
                  productDetails.namespaceId,
                  productDetails.capacity,
                  color,
                )}
                key={color}
                className={classNames(styles.info__color, {
                  [styles.info__colorActive]: color === productDetails.color,
                })}
                aria-label={`Select ${color} color`}
              >
                <span
                  className={styles.info__colorSwatch}
                  style={{ backgroundColor: productColors[normalizedColor] }}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.info__section}>
        <p className={styles.info__label}>Select capacity</p>
        <div className={styles.info__options}>
          {productDetails.capacityAvailable.map(capacity => (
            <Link
              to={getProductPath(
                productDetails.namespaceId,
                capacity,
                productDetails.color,
              )}
              key={capacity}
              className={classNames(styles.info__capacity, {
                [styles.info__capacityActive]:
                  capacity === productDetails.capacity,
              })}
            >
              {capacity}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.info__prices}>
        <h2 className={styles.info__priceDiscount}>
          ${productDetails.priceDiscount}
        </h2>
        <h3 className={styles.info__priceRegular}>
          ${productDetails.priceRegular}
        </h3>
      </div>
      <div className={styles.info__actions}>
        <AddToCartButton
          className={styles.info__cartButton}
          isSelected={isProductInCart}
          onClick={() =>
            isProductInCart ? removeFromCart(product.id) : addToCart(product)
          }
        >
          {isProductInCart ? 'Added to cart' : 'Add to cart'}
        </AddToCartButton>
        <FavoriteButton
          className={styles.info__favoriteButton}
          isSelected={isProductFavorite}
          onClick={() => toggleFavorite(product)}
        />
      </div>
      <dl className={styles.info__specs}>
        <div className={styles.info__spec}>
          <dt className={styles.info__specName}>Screen</dt>
          <dd className={styles.info__specValue}>{productDetails.screen}</dd>
        </div>

        <div className={styles.info__spec}>
          <dt className={styles.info__specName}>Resolution</dt>
          <dd className={styles.info__specValue}>
            {productDetails.resolution}
          </dd>
        </div>

        <div className={styles.info__spec}>
          <dt className={styles.info__specName}>Processor</dt>
          <dd className={styles.info__specValue}>{productDetails.processor}</dd>
        </div>

        <div className={styles.info__spec}>
          <dt className={styles.info__specName}>RAM</dt>
          <dd className={styles.info__specValue}>{productDetails.ram}</dd>
        </div>
      </dl>
    </section>
  );
};
