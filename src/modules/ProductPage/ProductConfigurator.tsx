import { ProductDetails } from '@/types/ProductDetails';
import React from 'react';
import styles from './ProductPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
type ProductConfiguratorProps = {
  product?: ProductDetails;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
  setSelectedCapacity: React.Dispatch<React.SetStateAction<string>>;
  selectedCapacity: string;
};

const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  product,
  setSelectedColor,
  selectedColor,
  setSelectedCapacity,
  selectedCapacity,
}) => {
  const { category, productSlug } = useParams();
  const navigate = useNavigate();

  const updateSlug = (type: 'color' | 'capacity', value: string) => {
    if (!product) return;

    const oldPart = product[type]; // product.color або product.capacity
    const newSlug = productSlug?.replace(
      oldPart.toLowerCase(),
      value.toLowerCase(),
    );

    if (type === 'color') {
      setSelectedColor(value);
    }

    if (type === 'capacity') {
      setSelectedCapacity(value);
    }

    navigate(`/${category}/${newSlug}`);
  };
  //  console.log(selectedCapacity);
  return (
    <div className={styles.productConfigurator}>
      <div className={styles.productConfigurator_controls}>
        <div className={styles.productConfigurator_colorContainer}>
          <span className={styles.productConfigurator_colorLabel}>
            Available colors
          </span>
          <div className={styles.productConfigurator_colorOptions}>
            {product?.colorsAvailable.map(color => (
              <div
                key={color}
                className={classNames(styles.productConfigurator_colorLayout, {
                  [styles.productConfigurator_colorLayoutActive]:
                    selectedColor === color,
                })}
                onClick={() => updateSlug('color', color)}
              >
                <div
                  className={styles.productConfigurator_colorOption}
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.productConfigurator_capacityContainer}>
          <span className={styles.productConfigurator_capacityLabel}>
            Select capacity
          </span>
          <div className={styles.productConfigurator_capacityOptions}>
            {product?.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                className={classNames(
                  styles.productConfigurator_capacityOption,
                  {
                    [styles.productConfigurator_capacityOptionActive]:
                      selectedCapacity === capacity,
                  },
                )}
                onClick={() => updateSlug('capacity', capacity)}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>
        <button className={styles.productConfigurator_addToCartBtn}>
          Add to Cart
        </button>
      </div>
      <div className={styles.productConfigurator_id}></div>
    </div>
  );
};

export default ProductConfigurator;
