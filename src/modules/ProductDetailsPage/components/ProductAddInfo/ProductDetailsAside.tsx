import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductDetailsAside.module.scss';
import { AddToCartButton } from '../../../../components/AddToCartButton';
import { FavoritesButton } from '../../../../components/FavoritesButton';
import { ProductsColors } from '../../../../constants/productsColors';
import { PhoneDetails } from '../../../../types/PhoneDetails';

type Props = {
  product: PhoneDetails;
  variants: PhoneDetails[];
};

export const ProductDetailsAside: React.FC<Props> = ({ product, variants }) => {
  const { category } = useParams();
  const sameModelVariants = variants.filter(
    variant => variant.namespaceId === product.namespaceId,
  );

  const colorVariants = sameModelVariants.filter(
    variant => variant.capacity === product.capacity,
  );

  const hasColorVariants = colorVariants.length > 0 ? colorVariants : [product];

  const capacityVariants = sameModelVariants.filter(
    variant => variant.color === product.color,
  );
  const hasCapacityVariants =
    capacityVariants.length > 0 ? capacityVariants : [product];

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
                [styles.active]: variant.color === product.color,
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
                [styles.active]: variant.capacity === product.capacity,
              })}
            >
              {variant.capacity}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.priceBlock}>
        <span className={styles.price}>${product.priceDiscount}</span>
        {product.priceRegular > product.priceDiscount && (
          <span className={styles.fullPrice}>${product.priceRegular}</span>
        )}
      </div>

      <div className={styles.buttons}>
        <AddToCartButton product={product} />
        <FavoritesButton productId={product.id} />
      </div>

      <div className={styles.specs}>
        {product.screen && (
          <div className={styles.specRow}>
            <span className={styles.key}>Screen</span>
            <span className={styles.value}>{product.screen}</span>
          </div>
        )}

        {product.resolution && (
          <div className={styles.specRow}>
            <span className={styles.key}>Resolution</span>
            <span className={styles.value}>{product.resolution}</span>
          </div>
        )}

        {product.processor && (
          <div className={styles.specRow}>
            <span className={styles.key}>Processor</span>
            <span className={styles.value}>{product.processor}</span>
          </div>
        )}

        {product.ram && (
          <div className={styles.specRow}>
            <span className={styles.key}>RAM</span>
            <span className={styles.value}>{product.ram}</span>
          </div>
        )}
      </div>
    </div>
  );
};
