import React from 'react';
import classNames from 'classnames';
import styles from './MainControls.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';
import { ActionButtons } from '../../../../components/ActionButtons';
import { Product } from '../../../../types/Product';

type Props = {
  productDetails: ProductDetails;
  setProductDetails: (productDetails: ProductDetails) => void;
  product: Product;
  allVariants: ProductDetails[];
};

export const MainControls: React.FC<Props> = ({
  productDetails,
  setProductDetails,
  product,
}) => {
  return (
    <div className={styles.mainControls}>
      <div className={styles.selector}>
        <label className={styles.label} htmlFor="capacity">
          Available colors
        </label>
        <div className={styles.buttons}>
          {productDetails.colorsAvailable.map(color => (
            <div
              className={classNames(styles.colorButtonContainer, {
                [styles.activeColorsAvailable]: productDetails.color === color,
              })}
              key={color}
            >
              <button
                value={color}
                onClick={() => setProductDetails({ ...productDetails, color })}
                style={{ backgroundColor: color }}
                className={styles.colorButton}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.selector}>
        <label className={styles.label} htmlFor="capacity">
          Select Capacity
        </label>
        <div className={styles.buttons}>
          {productDetails.capacityAvailable.map(capacity => (
            <button
              key={capacity}
              value={capacity}
              onClick={() => setProductDetails({ ...productDetails, capacity })}
              className={classNames(styles.capacityButton, {
                [styles.active]: productDetails.capacity === capacity,
              })}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.divider}></div>

      <div className={styles.price}>
        <div className={styles.existPrice}>${product.fullPrice}</div>
        <div className={styles.hotPrice}>${product.price}</div>
      </div>
      {product && <ActionButtons product={product} />}

      <ul className={styles.specsList}>
        <li className={styles.specs}>
          <strong className={styles.specsKey}>Screen</strong>
          <span className={styles.specsValue}>{productDetails.screen}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Resolution</strong>
          <span className={styles.specsValue}>{productDetails.resolution}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Processor</strong>
          <span className={styles.specsValue}>{productDetails.processor}</span>
        </li>
      </ul>
    </div>
  );
};
