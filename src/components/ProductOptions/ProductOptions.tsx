import React from 'react';
import styles from './ProductOptions.module.scss';
import { normalizeColor } from '../../utils/normalizeColor';
import { ProductType } from '../../types/ProductType';
import { ColorSelector } from './ColorSelector';
import { CapacitySelector } from './CapacitySelector';
import PriceBlock from './PriceBlock';
type ProductOptionsProps = {
  product: ProductType;
};

export const ProductOptions: React.FC<ProductOptionsProps> = ({ product }) => {
  const {
    id,
    colorsAvailable,
    namespaceId,
    capacityAvailable,
    capacity,
    color,
    category,
    priceDiscount,
    priceRegular,
    processor,
    resolution,
    screen,
    ram,
  } = product;

  const normalizedCurrentColor = normalizeColor(color);

  return (
    <div className={styles.productOptions}>
      <ColorSelector
        namespaceId={namespaceId}
        colorsAvailable={colorsAvailable}
        normalizedCurrentColor={normalizedCurrentColor}
        capacity={capacity}
        category={category}
      />

      <CapacitySelector
        capacityAvailable={capacityAvailable}
        normalizedCurrentColor={normalizedCurrentColor}
        namespaceId={namespaceId}
        capacity={capacity}
        category={category}
      />

      <PriceBlock
        itemId={id}
        priceDiscount={priceDiscount}
        priceRegular={priceRegular}
        screen={screen}
        resolution={resolution}
        processor={processor}
        ram={ram}
      />
    </div>
  );
};
