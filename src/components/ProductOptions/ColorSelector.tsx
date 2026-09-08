import React from 'react';
import styles from './ProductOptions.module.scss';
import { COLOR_MAP } from '../../utils/colorMap';
import { normalizeColor } from '../../utils/normalizeColor';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type ColorSelectorProps = {
  namespaceId: string;
  colorsAvailable: string[];
  normalizedCurrentColor: string;
  capacity: string;
  category: string;
};

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  namespaceId,
  colorsAvailable,
  normalizedCurrentColor,
  capacity,
  category,
}) => {
  return (
    <div className={styles.productOptions__colorsWrapper}>
      <div className={styles.productOptions__title}>
        <span>Available colors</span>
        <span className={styles.productOptions__id}>
          ID: {namespaceId.split('-')[1]}
        </span>
      </div>

      <ul className={styles.productOptions__colors}>
        {colorsAvailable.sort().map(colorItem => {
          const normalizedColor = normalizeColor(colorItem);
          const background = COLOR_MAP[colorItem.toLowerCase()] || '#ccc';

          const url = `/${category}/${namespaceId}-${capacity.toLowerCase()}-${normalizedColor}`;

          return (
            <li
              key={colorItem}
              className={classNames(
                styles.productOptions__colorItem,
                normalizedCurrentColor === normalizedColor &&
                  styles['productOptions__color--active'],
              )}
            >
              <Link to={url}>
                <span
                  className={styles.productOptions__color}
                  style={{ backgroundColor: background }}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
