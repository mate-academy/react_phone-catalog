import { ProductInfo } from '../../../../types/ProductInfo';
import styles from './VariableChars.module.scss';
import { colors } from '../../../../helpers/constArrs';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: ProductInfo | undefined;
};

export const VariableChars: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.variablechars}>
      <div className={styles.variablechars__block}>
        <p className={styles.variablechars__title}>Available colors</p>

        <ul className={styles.variablechars__items}>
          {product?.colorsAvailable.map(color => {
            const colorVar = colors.find(c => c.name === color);

            if (!colorVar) {
              return null;
            }

            return (
              <li
                key={color}
                className={classNames(styles.variablechars__color, {
                  [styles.variablechars__color_active]: product.color === color,
                })}
                style={{ backgroundColor: colorVar.value }}
                onClick={() =>
                  navigate(
                    `/${product.category}/${product.namespaceId}-${product.capacity.toLowerCase()}-${color.replace(' ', '-')}`,
                  )
                }
              ></li>
            );
          })}
        </ul>
      </div>

      <span className={styles.variablechars__divider}></span>

      <div className={styles.variablechars__block}>
        <p className={styles.variablechars__title}>Select capacity</p>

        <ul className={styles.variablechars__items}>
          {product?.capacityAvailable.map(capacityValue => (
            <li
              key={capacityValue}
              className={classNames(styles.variablechars__capacity, {
                [styles.variablechars__capacity_active]:
                  capacityValue === product.capacity,
              })}
              onClick={() =>
                navigate(
                  `/${product.category}/${product.namespaceId}-${capacityValue.toLowerCase()}-${product.color}`,
                )
              }
            >
              {capacityValue.replace('GB', ' GB')}
            </li>
          ))}
        </ul>
      </div>

      <span className={styles.variablechars__divider}></span>
    </div>
  );
};
