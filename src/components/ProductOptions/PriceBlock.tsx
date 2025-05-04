import React from 'react';
import styles from './ProductOptions.module.scss';
import ProductInfo from './ProductInfo';
import { Actions } from '../../shared/Actions/Actions';
type PriceBlockProps = {
  priceDiscount: number;
  priceRegular: number;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
};

const PriceBlock: React.FC<PriceBlockProps> = ({
  priceDiscount,
  priceRegular,
  screen,
  resolution,
  processor,
  ram,
}) => {
  return (
    <div className={styles.productOptions__prices}>
      <div className={styles.productOptions__price}>
        {priceDiscount && (
          <span className={styles.productOptions__fullPrice}>
            ${priceRegular}
          </span>
        )}
        {priceDiscount && (
          <span className={styles.productOptions__discount}>
            ${priceDiscount}
          </span>
        )}
      </div>

      <Actions />

      <ProductInfo
        screen={screen}
        resolution={resolution}
        processor={processor}
        ram={ram}
      />
    </div>
  );
};

export default PriceBlock;
