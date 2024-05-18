import React from 'react';
import { ActionBlock } from '../../../../components/ActionBlock';
import styles from './ProductAction.module.scss';
import { ProductInfo } from '../../../../types/ProductInfo';

type Props = {
  product: ProductInfo;
};

export const ProductAction: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.actionBlock}>
      <div className={styles.priceWrap}>
        <span className={styles.price}>{`$${product.priceDiscount}`}</span>
        <span className={styles.priceDisc}>{`$${product.priceRegular}`}</span>
      </div>

      <div className={styles.actionBtns}>
        <ActionBlock product={product} customHeight={48} paddingFav={15} />
      </div>
    </div>
  );
};
