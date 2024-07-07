import styles from './AvailableModelsInfo.module.scss';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import classNames from 'classnames';
import { ProductCardButtons } from '../ProductCardButtons/ProductCardButtons';
import { productColors } from '../../utils/Arrays';

type Props = {
  product: Product;
  productDetails: ProductDetails;
};

export const AvailableModelsInfo: React.FC<Props> = ({
  product,
  productDetails,
}) => {
  const navigate = useNavigate();

  const { namespaceId, capacity, color } = productDetails;

  return (
    <div className={styles.availableModelsContainer}>
      <div className={styles.optionsWrapper}>
        <p>Available colors</p>

        <div className={styles.allColorButtons}>
          {productDetails.colorsAvailable.map(colorOption => {
            const colorOptions = productColors.find(
              col => col.name === colorOption,
            );

            if (!colorOptions) {
              return null;
            }

            return (
              <div
                key={color}
                className={classNames(styles.buttonWrapper, {
                  [styles.colorButtonActive]:
                    productDetails.color === colorOption,
                })}
              >
                <button
                  value={color}
                  className={styles.colorButton}
                  style={{ backgroundColor: colorOptions.value }}
                  onClick={() =>
                    navigate(
                      `/products/${namespaceId}-${capacity.toLowerCase()}-${colorOption.replace(' ', '-')}`,
                    )
                  }
                />
              </div>
            );
          })}
        </div>

        <div className={styles.divider}></div>

        <div className={styles.optionsWrapper}>
          <p>Select capacity</p>

          <div className={styles.capacityButtons}>
            {productDetails.capacityAvailable.map(capacityOption => (
              <button
                key={capacityOption}
                value={capacityOption}
                className={classNames(styles.capacityButton, {
                  [styles.capacityButtonActive]:
                    productDetails.capacity === capacityOption,
                })}
                onClick={() =>
                  navigate(
                    `/products/${namespaceId}-${capacityOption.toLowerCase()}-${color}`,
                  )
                }
              >
                {capacityOption}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.priceWrapper}>
          <p
            className={styles.priceRegular}
          >{`$${productDetails.priceRegular}`}</p>
          <p
            className={styles.priceDiscount}
          >{`$${productDetails.priceDiscount}`}</p>
        </div>

        {product && <ProductCardButtons product={product} />}

        <div className={styles.techContainer}>
          <div className={styles.techWrapper}>
            <p className={styles.techChars}>Screen</p>
            <p className={styles.techCharInfo}>{productDetails.screen}</p>
          </div>

          <div className={styles.techWrapper}>
            <p className={styles.techChars}>Resolution</p>
            <p className={styles.techCharInfo}>{productDetails.resolution}</p>
          </div>

          <div className={styles.techWrapper}>
            <p className={styles.techChars}>Processor</p>
            <p className={styles.techCharInfo}>{productDetails.processor}</p>
          </div>

          <div className={styles.techWrapper}>
            <p className={styles.techChars}>RAM</p>
            <p className={styles.techCharInfo}>{productDetails.ram}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
