import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionButtons } from '@ui/index';

import { useProducts } from '@hooks/useProducts';

import { TProductBase } from '@utils/types/productBase.type';

import { ProductPrice, ProductSpec } from '../index';
import { CardOptionsSelector, CardRandomID } from '../product-detail/index';
import styles from './ProductOptionsWrapper.module.scss';

type TProps = {
  itemId: string | undefined;
  selectedProduct: TProductBase | undefined;
  onCapacityChange: (capacity: string) => void;
  onColorChange: (color: string) => void;
};

export const ProductOptionsWrapper: FC<TProps> = ({
  itemId,
  selectedProduct,
  onCapacityChange,
  onColorChange,
}) => {
  const { t } = useTranslation();
  const { selectProduct } = useProducts();
  const product = selectProduct(itemId);

  if (!selectedProduct) return null;

  const {
    color,
    colorsAvailable,
    capacity,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
  } = selectedProduct;

  const localColor = t('product.color');
  const localCapacity = t('product.capacity');

  return (
    <div className={styles.wrapper}>
      <CardRandomID itemId={itemId} />
      <CardOptionsSelector
        currentValue={color}
        options={colorsAvailable}
        label={localColor}
        onChange={onColorChange}
        isColor
      />

      <hr />
      <CardOptionsSelector
        currentValue={capacity}
        options={capacityAvailable}
        label={localCapacity}
        onChange={onCapacityChange}
      />
      <hr />

      <div className={styles.price}>
        <ProductPrice price={priceDiscount} fullPrice={priceRegular} discount />
        <ActionButtons product={product} />
      </div>

      <ProductSpec
        screen={screen}
        resolution={resolution}
        processor={processor}
        ram={ram}
      />
    </div>
  );
};
