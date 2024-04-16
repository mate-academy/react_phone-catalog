import React from 'react';
import classNames from 'classnames';
import styles from './MainControls.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';
import { ActionButtons } from '../../../../components/ActionButtons';
import { Product } from '../../../../types/Product';
// eslint-disable-next-line max-len
import { fetchProductByColorAndCapacity } from '../../../../servises/ProductsDetails';
import { useNavigate } from 'react-router-dom';

type Props = {
  productDetails: ProductDetails;
  setProductDetails: (productDetails: ProductDetails) => void;
  product: Product;
};

export const MainControls: React.FC<Props> = ({ productDetails, product }) => {
  const navigate = useNavigate();

  const handleAttributeChange = async (color: string, capacity: string) => {
    const newProductId = await fetchProductByColorAndCapacity(
      productDetails.category,
      productDetails.namespaceId,
      color,
      capacity,
    );

    if (newProductId) {
      navigate(`/products/${newProductId}`);
    }
  };

  return (
    <div className={styles.mainControls}>
      <div className={styles.selector}>
        <p className={styles.label}>Available colors</p>

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
                style={{ backgroundColor: color }}
                className={styles.colorButton}
                onClick={() =>
                  handleAttributeChange(color, productDetails.capacity)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.selector}>
        <p className={styles.label}>Select Capacity</p>

        <div className={styles.buttons}>
          {productDetails.capacityAvailable.map(capacity => (
            <button
              key={capacity}
              value={capacity}
              className={classNames(styles.capacityButton, {
                [styles.active]: productDetails.capacity === capacity,
              })}
              onClick={() =>
                handleAttributeChange(productDetails.color, capacity)
              }
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.price}>
        <div className={styles.existPrice}>${productDetails.priceRegular}</div>
        <div className={styles.hotPrice}>${productDetails.priceDiscount}</div>
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
