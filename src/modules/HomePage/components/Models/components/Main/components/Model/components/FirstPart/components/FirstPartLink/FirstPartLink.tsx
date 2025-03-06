import React from 'react';

// eslint-disable-next-line max-len
import { Product } from '../../../../../../../../../../../../types/CategoriesTypes/Product';
import styles from './FirstPartLink.module.scss';

type PickedProps = Pick<Product, 'name'>;

type Props = PickedProps & {
  productTitle: string;
};

export const FirstPartLink: React.FC<Props> = React.memo(
  ({ productTitle, name }) => {
    return (
      <div className={styles['product-title']} title={name}>
        {productTitle}
      </div>
    );
  },
);

FirstPartLink.displayName = 'FirstPartLink';
