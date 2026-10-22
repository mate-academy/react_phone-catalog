import React from 'react';
import styles from './ItemDetails.module.scss';

import { ItemDescription, ItemSpec } from '../ItemDetails';
import { ProductDetails } from '../../../types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const ItemDetails: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.details}>
      <ItemDescription product={product} />
      <ItemSpec product={product} />
    </div>
  );
};
