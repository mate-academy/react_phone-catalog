import { TypesOfProducts } from '../../types/TypesOfProducts';
import styles from './ProductCapacity.module.scss';
import classNames from 'classnames';

type Props = {
  currentProduct: TypesOfProducts;
  currentCapacity: string;
};

export const ProductCapacity: React.FC<Props> = ({
  currentProduct,
  currentCapacity,
}) => {
  return (
    <>
      <h2 className={styles.title}>Select capacity</h2>
      <div className={styles.capacityVariants}>
        {currentProduct?.capacityAvailable.map(variant => (
          <label
            htmlFor={variant}
            key={variant}
            className={styles.capacityLabel}
          >
            <input
              type="radio"
              name="variant"
              id={variant}
              value={variant}
              className={styles.input}
            />

            <span
              className={classNames(styles.capacityButton, {
                [styles.capacityActive]: currentCapacity === variant,
              })}
            >
              {variant}
            </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default ProductCapacity;
