import { useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../../../types/ProductDetails';
import { COLOR_HEX } from '../../constants/colors';
import styles from './VariantSelector.module.scss';

const formatCapacity = (capacity: string) =>
  capacity.replace(/(\d)([A-Z])/, '$1 $2');

interface Props {
  details: ProductDetails;
  productNumber: number;
}

export const VariantSelector = ({ details, productNumber }: Props) => {
  const navigate = useNavigate();

  const goToVariant = (color: string, capacity: string) => {
    const colorSlug = color.replace(/ /g, '-');
    const variantId = `${details.namespaceId}-${capacity.toLowerCase()}-${colorSlug}`;

    navigate(`/product/${variantId}`, {
      replace: true,
      state: { keepScroll: true },
    });
  };

  return (
    <div>
      <fieldset className={styles.group}>
        <legend className={styles.legend}>Available colors</legend>

        <span className={styles.id}>ID: {productNumber}</span>

        <div className={styles.options}>
          {details.colorsAvailable.map(color => (
            <label key={color} className={styles.option}>
              <input
                type="radio"
                name="color"
                value={color}
                checked={color === details.color}
                onChange={() => goToVariant(color, details.capacity)}
                className={styles.input}
              />

              <span
                className={styles.swatch}
                style={{ backgroundColor: COLOR_HEX[color] ?? color }}
              />

              <span className={styles.hiddenText}>{color}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Select capacity</legend>

        <div className={styles.options}>
          {details.capacityAvailable.map(capacity => (
            <label key={capacity} className={styles.option}>
              <input
                type="radio"
                name="capacity"
                value={capacity}
                checked={capacity === details.capacity}
                onChange={() => goToVariant(details.color, capacity)}
                className={styles.input}
              />

              <span className={styles.capacity}>
                {formatCapacity(capacity)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
