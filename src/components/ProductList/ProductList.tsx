import React from 'react';
import classNames from 'classnames';

import styles from './ProductList.module.scss';
import { ProductCard } from '../ProductCard';
import { DeviceShort } from '../../types/DeviceShort';

type Props = {
  items: DeviceShort[];
};

export const ProductList: React.FC<Props> = ({ items }) => {
  return (
    <div className={classNames(styles.list)}>
      {items.map(curItem => (
        <div className={styles.list__card} key={curItem.id}>
          <ProductCard item={curItem} />
        </div>
      ))}
    </div>
  );
};
