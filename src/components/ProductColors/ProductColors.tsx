import classNames from 'classnames';
import { COLOR_MAP } from '../../types/Colors';
import styles from './ProductColors.module.scss';
import { TypesOfProducts } from '../../types/TypesOfProducts';
import { Options } from '../../types/Options';

type Props = {
  currentColor: string;
  currentProduct: TypesOfProducts;
  optionsChange: (color: Options) => void;
};

export const ProductColors: React.FC<Props> = ({
  currentProduct,
  currentColor,
  optionsChange,
}) => {
  return (
    <>
      <h2 className={styles.title}>Available colors</h2>

      <div className={styles.colorContainer}>
        {currentProduct?.colorsAvailable.map(color => {
          const realColor = color.toLowerCase().replaceAll(' ', '');

          return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
              key={color}
              className={styles.colorLabel}
              htmlFor={realColor}
            >
              <input
                id={realColor}
                checked={currentColor === color}
                type="radio"
                name="color"
                onChange={() => {
                  optionsChange({ color: color });
                }}
                className={styles.input}
              />

              <div
                className={classNames(styles.outsideBorder, {
                  [styles.activeBorder]: currentColor === color,
                })}
              >
                <span
                  className={styles.colorCircle}
                  style={{
                    backgroundColor: COLOR_MAP[realColor] || realColor,
                  }}
                />
              </div>
            </label>
          );
        })}
      </div>
    </>
  );
};

export default ProductColors;
