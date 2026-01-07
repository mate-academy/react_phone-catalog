import React from 'react';
import styles from './MainControls.module.scss';
import { AnyDetailedProduct } from '../../../../types/DetailedProductTypes';
import { AvailableColors } from './components/AvailableColors';
import { SelectCapacity } from './components/SelectCapacity/SelectCapacity';
import { Product } from '../../../../types/Product';
import { SpecItem } from '../../../../types/SpecItem';
import { PriceDisplay } from '../../../../components/PriceDisplay';
import { ProductActions } from '../../../../components/ProductActions';
import { SpecsDisplay } from '../../../../components/SpecsDisplay';

interface ProductOptionsProps {
  product: AnyDetailedProduct;
  shortProduct: Product;
}

export const MainControls: React.FC<ProductOptionsProps> = ({
  product,
  shortProduct,
}) => {
  const {
    priceRegular: fullPrice,
    priceDiscount: price,
    screen,
    resolution,
    processor,
    ram,
  } = product;

  const detailedSpecs: SpecItem[] = [
    { labelKey: 'card_screen', value: screen || '' },
    { labelKey: 'card_resolution', value: resolution || '' },
    { labelKey: 'card_processor', value: processor || '' },
    { labelKey: 'card_ram', value: ram || '' },
  ].filter(spec => spec.value);

  return (
    <div className={styles['main-controls']}>
      <div className={styles['main-controls__options']}>
        <AvailableColors product={product} />

        <SelectCapacity product={product} />
      </div>

      <div className={styles['product-prices-actions__wraper']}>
        <PriceDisplay price={price} fullPrice={fullPrice} size="large" />

        <ProductActions product={shortProduct} />
      </div>

      <SpecsDisplay specs={detailedSpecs} size="small" />
    </div>
  );
};
