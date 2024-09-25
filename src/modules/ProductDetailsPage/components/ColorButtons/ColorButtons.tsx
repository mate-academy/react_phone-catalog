import { FC } from 'react';
import styles from './ColorButtons.module.scss';
import classNames from 'classnames';
import { ProductDetails } from '../../../../types/ProductDetails';

interface Props {
  product: ProductDetails;
  filterChange: (color: string, capacity: string) => Promise<void>;
}

export const ColorButtons: FC<Props> = ({ product, filterChange }) => {
  return (
    <ul className={styles.colors}>
      {product.colorsAvailable.map((color: string) => (
        <li
          className={classNames(styles.colorButtonContainer, {
            [styles.activeColorsAvailable]: product.color === color,
          })}
          key={color}
        >
          <button
            value={color}
            style={{ backgroundColor: color }}
            className={styles.colorButton}
            onClick={() => filterChange(color, product.capacity)}
          />
        </li>
      ))}
    </ul>
  );
};
