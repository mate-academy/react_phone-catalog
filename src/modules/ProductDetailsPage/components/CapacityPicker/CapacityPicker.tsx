import React from 'react';
import styles from './CapacityPicker.module.scss';
import { Link } from 'react-router-dom';
import { SquareButton } from '../SquareButton';
import { ProductType } from '../../../../types/ProductType';

type Props = {
  product: ProductType;
  options: string[];
};

export const CapacityPicker: React.FC<Props> = ({ product, options }) => {
  return (
    <div className={styles.picker}>
      {options.map(capacity => {
        const linkColor = product.color.replace(' ', '-');
        const linkTo = `../${product.namespaceId}-${capacity.toLowerCase()}-${linkColor}`;

        return (
          <Link to={linkTo} key={capacity}>
            <SquareButton
              text={capacity}
              isActive={capacity === product.capacity}
            />
          </Link>
        );
      })}
    </div>
  );
};
