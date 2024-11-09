import styles from './ProductTechSpec.module.scss';
import classNames from 'classnames';
import { formatSpecText } from '../../../../utils/formatSpecText';
import { Product } from '../../../../types/Product';
import React from 'react';

interface Props {
  product: Product;
}

export const ProductTechSpec: React.FC<Props> = ({
  product: { capacity, screen, ram, resolution, processor, camera, zoom, cell },
}) => {
  return (
    <div className={styles.productTechSpecContainer}>
      <h3 className={styles.aboutTitle}>Tech specs</h3>
      <ul className={styles.productInfo}>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>Screen</span>
          <span>{formatSpecText(screen)}</span>
        </li>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>Resolution</span>
          <span>{resolution}</span>
        </li>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>Processor</span>
          <span>{processor}</span>
        </li>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>RAM</span>
          <span>{formatSpecText(ram)}</span>
        </li>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>Built in memory</span>
          <span>{formatSpecText(capacity)}</span>
        </li>
        {!!camera && (
          <li
            className={classNames(
              styles.productInfoItem,
              styles.productSpecItem,
            )}
          >
            <span>Camera</span>
            <span>{formatSpecText(camera)}</span>
          </li>
        )}
        {!!zoom && (
          <li
            className={classNames(
              styles.productInfoItem,
              styles.productSpecItem,
            )}
          >
            <span>Zoom</span>
            <span>{formatSpecText(zoom)}</span>
          </li>
        )}
        {cell.includes('Not applicable') || (
          <li
            className={classNames(
              styles.productInfoItem,
              styles.productSpecItem,
            )}
          >
            <span>Cell</span>
            <span>{cell.join(', ')}</span>
          </li>
        )}
      </ul>
    </div>
  );
};
