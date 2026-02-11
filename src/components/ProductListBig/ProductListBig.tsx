import React from 'react';

import styles from './ProductListBig.module.scss';
import classNames from 'classnames';
import { ProductCardBig } from '../ProductCardBig';
import { DeviceShort } from '../../types/DeviceShort';

type Props = {
  items: DeviceShort[];
};

export const ProductListBig: React.FC<Props> = ({ items }) => {
  return (
    <div className={classNames(styles.list)}>
      {items.map(curItem => (
        <div className={styles.list__card} key={curItem.id}>
          <ProductCardBig item={curItem} />
        </div>
      ))}
    </div>
  );
};
