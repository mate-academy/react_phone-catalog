import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductDetailsAside.module.scss';
import { AddToCartButton } from '../../../../components/AddToCartButton';
import { FavoritesButton } from '../../../../components/FavoritesButton';
import { ProductsColors } from '../../../../constants/productsColors';
import { PhoneDetails } from '../../../../types/PhoneDetails';
import { Product } from '../../../../types/Product';

type Props = {
  productDetails: PhoneDetails;
  productForCart: Product;
  variants: PhoneDetails[];
};

export const ProductDetailsAside: React.FC<Props> = ({
  productDetails,
  productForCart,
  variants,
}) => {
  const { category } = useParams();
  const sameModelVariants = variants.filter(
    variant => variant.namespaceId === productDetails.namespaceId,
  );

  const colorVariants = sameModelVariants.filter(
    variant => variant.capacity === productDetails.capacity,
  );

  const hasColorVariants =
    colorVariants.length > 0 ? colorVariants : [productDetails];

  const capacityVariants = sameModelVariants.filter(
    variant => variant.color === productDetails.color,
  );
  const hasCapacityVariants =
    capacityVariants.length > 0 ? capacityVariants : [productDetails];

  const price =
    productDetails.priceDiscount ??
    productDetails.price ??
    productForCart.price;

  const fullPrice =
    productDetails.priceRegular ??
    productDetails.fullPrice ??
    productForCart.fullPrice;
  // const imagePath = `/react_phone-catalog/${product.images?.[0] ?? ''}`;

  return (
    <div className={styles.container}>
      <div className={styles.colorsBlock}>
        <h4 className={styles.optionLabel}>Available colors</h4>
        <div className={styles.colorOptions}>
          {hasColorVariants.map(variant => (
            <Link
              key={variant.id}
              to={`/${category}/${variant.id}`}
              className={classNames(styles.colorDot, {
                [styles.active]: variant.color === productDetails.color,
              })}
              style={{
                backgroundColor: ProductsColors[variant.color] || '#ccc',
              }}
              aria-label={variant.color}
            />
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.capacityBlock}>
        <h4 className={styles.optionLabel}>Select capacity</h4>
        <div className={styles.capacityOptions}>
          {hasCapacityVariants.map(variant => (
            <Link
              key={variant.id}
              to={`/${category}/${variant.id}`}
              className={classNames(styles.capacityButton, {
                [styles.active]: variant.capacity === productDetails.capacity,
              })}
            >
              {variant.capacity}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.priceBlock}>
        <span className={styles.price}>${price}</span>
        {fullPrice > price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.buttons}>
        <AddToCartButton product={productForCart} />
        <FavoritesButton productId={productForCart.itemId} />
      </div>

      <div className={styles.specs}>
        {productDetails.screen && (
          <div className={styles.specRow}>
            <span className={styles.key}>Screen</span>
            <span className={styles.value}>{productDetails.screen}</span>
          </div>
        )}

        {productDetails.resolution && (
          <div className={styles.specRow}>
            <span className={styles.key}>Resolution</span>
            <span className={styles.value}>{productDetails.resolution}</span>
          </div>
        )}

        {productDetails.processor && (
          <div className={styles.specRow}>
            <span className={styles.key}>Processor</span>
            <span className={styles.value}>{productDetails.processor}</span>
          </div>
        )}

        {productDetails.ram && (
          <div className={styles.specRow}>
            <span className={styles.key}>RAM</span>
            <span className={styles.value}>{productDetails.ram}</span>
          </div>
        )}
      </div>
    </div>
  );
};
