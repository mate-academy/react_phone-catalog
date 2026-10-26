import cn from 'classnames';
import { useProductOptions } from '../../hooks/useProductOptions';
import { productColors } from './ProductColors';
import { ProductDetails } from 'src/types/Types';
import styles from './ColorPicker.module.scss';
import { HTMLAttributes } from 'react';

type Props = {
  currentProduct: ProductDetails;
} & HTMLAttributes<HTMLDivElement>;

export const ColorPicker = ({ currentProduct, className }: Props) => {
  const handleProductChange = useProductOptions();

  const activeColor = currentProduct.color;
  const colorsAvailable = currentProduct.colorsAvailable;

  return (
    <div className={cn(styles.colorPicker, className)}>
      <p className={styles.title}>Available colors</p>

      <ul className={styles.list}>
        {colorsAvailable.map(color => (
          <li key={color} className={styles.listItem}>
            <button
              title={color}
              type="button"
              style={{ backgroundColor: productColors[color] }}
              className={cn(
                styles.button,
                activeColor === color && styles.active,
              )}
              onClick={() =>
                handleProductChange(currentProduct, { color: color })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
