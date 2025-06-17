import React from 'react';
import styles from './ProductDetailsAside.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AddToCartButton } from '../../../../components/AddToCartButton';
import { FavoritesButton } from '../../../../components/FavoritesButton';
import { Product } from '../../../../types/Product';
import { PhoneDetails } from '../../../../types/PhoneDetails';
import { ProductsColors } from '../../../../constants/productsColors';

type Props = {
  product: PhoneDetails;
  variants: PhoneDetails[];
};

export const ProductDetailsAside: React.FC<Props> = ({ product, variants }) => {
  // const filteredVariants = variants.filter(variant =>
  //   product.colorsAvailable.includes(variant.colorsAvailable[0]),
  // );

  const sameModelVariants = variants.filter(
    variant => variant.namespaceId === product.namespaceId,
  );

  const colorVariants = sameModelVariants.filter(
    variant => variant.capacity === product.capacity,
  );

  const capacityVariants = sameModelVariants.filter(
    variant => variant.color === product.color,
  );

  return (
    <div className={styles.container}>
      {/* <div className={styles.params}> */}
      <div className={styles.colorsBlock}>
        <h4 className={styles.optionLabel}>Available colors</h4>
        <div className={styles.colorOptions}>
          {colorVariants.map(variant => (
            <Link
              key={String(variant.id)}
              to={`/phones/${variant.id}`}
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

      {/* <div className={styles.idBlock}>
          <span className={styles.idLabel}>ID:</span>
          <span className={styles.idValue}>{product.id}</span>
        </div> */}
      {/* </div> */}

      <div className={styles.divider} />

      <div className={styles.capacityBlock}>
        <h4 className={styles.optionLabel}>Select capacity</h4>
        <div className={styles.capacityOptions}>
          {capacityVariants.map(variant => (
            <Link
              key={variant.id}
              to={`/phones/${variant.id}`}
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
        <FavoritesButton productId={String(product.id)} />
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.key}>Screen</span>
          <span className={styles.value}>{product.screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.key}>Resolution</span>
          <span className={styles.value}>{product.resolution}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.key}>Processor</span>
          <span className={styles.value}>{product.processor}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.key}>RAM</span>
          <span className={styles.value}>{product.ram}</span>
        </div>
      </div>
    </div>
  );
};
