import { FC } from 'react';
import styles from './ColorButtons.module.scss';
import classNames from 'classnames';
import { ProductDetails } from '../../../../types/ProductDetails';
import { colorMap } from '../Helpers/colorMap';

interface Props {
  product: ProductDetails;
  filterChange: (color: string, capacity: string) => Promise<void>;
}

export const ColorButtons: FC<Props> = ({ product, filterChange }) => {
  return (
    <ul className={styles.colors}>
      {product.colorsAvailable.map((color: string) => {
        return (
          <li
            className={classNames(styles.colorButtonContainer, {
              [styles.activeColorsAvailable]: product.color === color,
            })}
            key={color}
          >
            <button
              value={color}
              style={{ backgroundColor: colorMap[color] }}
              className={styles.colorButton}
              onClick={() => filterChange(color, product.capacity)}
            />
          </li>
        );
      })}
    </ul>
  );
};
