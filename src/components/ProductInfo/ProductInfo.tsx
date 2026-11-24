import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import styles from './ProductInfo.module.scss';
import { ProductActions } from '../ProductActions';
import { colorHex } from '../../constants/colors';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product;
  details: ProductDetails;
}

export const ProductInfo: React.FC<Props> = ({ product, details }) => {
  const navigate = useNavigate();

  const specs = [
    { label: 'Screen', value: details.screen },
    { label: 'Resolution', value: details.resolution },
    { label: 'Processor', value: details.processor },
    { label: 'RAM', value: details.ram },
  ];

  const goToVariant = (color: string, capacity: string) => {
    const colorPart = color.replaceAll(' ', '-');
    const capacityPart = capacity.toLowerCase();

    navigate(`/product/${details.namespaceId}-${capacityPart}-${colorPart}`);
  };

  return (
    <div className={styles.info}>
      <span className={styles.info__id}>ID: {product.id}</span>

      <div className={styles.info__group}>
        <span>Available colors</span>

        <div className={styles.info__colors}>
          {details.colorsAvailable.map(color => (
            <label
              key={color}
              className={styles.info__color}
              style={{ backgroundColor: colorHex[color] ?? '#F0F0F0' }}
            >
              <input
                type="radio"
                name="color"
                value={color}
                checked={color === details.color}
                onChange={() => goToVariant(color, details.capacity)}
                className={styles.info__radio}
                aria-label={color}
              />
            </label>
          ))}
        </div>
      </div>

      <div className={styles.info__group}>
        <span>Select capacity</span>

        <div className={styles.info__capacities}>
          {details.capacityAvailable.map(capacity => (
            <label key={capacity} className={styles.info__capacity}>
              <input
                type="radio"
                name="capacity"
                value={capacity}
                checked={capacity === details.capacity}
                onChange={() => goToVariant(details.color, capacity)}
                className={styles.info__radio}
              />
              {capacity}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.info__prices}>
        <span className={styles.info__price}>${details.priceDiscount}</span>
        <span className={styles.info__priceOld}>${details.priceRegular}</span>
      </div>

      <ProductActions product={product} />

      <div className={styles.info__specs}>
        {specs.map(spec => (
          <div key={spec.label} className={styles.info__spec}>
            <span className={styles.info__specLabel}>{spec.label}</span>
            <span className={styles.info__specValue}>{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
