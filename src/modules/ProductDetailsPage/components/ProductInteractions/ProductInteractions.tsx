import React from 'react';
import { DetailsProductType } from '../../../../shared/types/DetailsProductType';
import styles from './ProductInteractions.module.scss';
import { ProductConfigurator } from '../ProductConfigurator';
import { BuySectoin } from '../BuySectoin';
import { Description } from '../../../shared/components/Description/Description';
import { descriptionsCreator } from '../../utils/descriptionsCreator';

interface Props {
  product: DetailsProductType;
}

export const ProductInteractions: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.product__interactions}>
      <ProductConfigurator
        colors={product.colorsAvailable}
        activeColor={product.color}
        capacity={product.capacityAvailable}
        activeCapacity={product.capacity}
      />

      <BuySectoin
        id={product.id}
        price={product.priceDiscount}
        fullPrice={product.priceRegular}
      />

      <Description
        discriptions={descriptionsCreator({
          screen: product.screen,
          resolution: product.resolution,
          processor: product.processor,
          ram: product.ram,
        })}
      />
    </div>
  );
};
