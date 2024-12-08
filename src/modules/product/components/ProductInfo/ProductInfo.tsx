import { useCallback } from 'react';

import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { Skeleton } from '@shared/components/Skeleton';
import { DefaultProps } from '@shared/types/common';
import { replaceSpaceWithCharacter } from '@shared/utils/helpers';

import styles from './ProductInfo.module.scss';
import { ProductCapacity } from '../ProductCapacity';
import { ProductCapacityProps } from '../ProductCapacity';
import { ProductColors, ProductColorsProps } from '../ProductColors';
import { ProductDetails, ProductDetailsProps } from '../ProductDetails';
import { ProductPrice } from '../ProductPrice';
import { ProductPriceProps } from '../ProductPrice';

interface ProductInfoProps
  extends DefaultProps,
    ProductColorsProps,
    ProductCapacityProps,
    ProductDetailsProps,
    ProductPriceProps {}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  id,
  className,
  colors,
  currentColor,
  currentCapacity,
  isLoading,
  capacities,
  newPrice,
  oldPrice,
  productName,
  features,
  onClick,
  ...rest
}) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const onChangePhone = useCallback(
    (currentValue: string, nextValue: string) => {
      if (id) {
        const fixedCurrentCapacity = replaceSpaceWithCharacter(
          currentValue.toLowerCase(),
        );
        const fixedCapacity = replaceSpaceWithCharacter(
          nextValue.toLowerCase(),
        );

        const url = id.replace(fixedCurrentCapacity, fixedCapacity);

        navigate(`/products/${url}${search}`);
      }
    },
    [navigate, id, search],
  );

  const onChangeColor = useCallback(
    (color: string) => {
      if (currentColor) {
        onChangePhone(currentColor, color);
      }
    },
    [currentColor, onChangePhone],
  );

  const onChangeCapacity = useCallback(
    (newCapacity: string) => {
      if (currentCapacity) {
        onChangePhone(currentCapacity, newCapacity);
      }
    },
    [currentCapacity, onChangePhone],
  );

  return (
    <Box className={cn(styles.container, className)} {...rest}>
      <Text variant="small" className={styles.code}>
        {isLoading ? <Skeleton width={60} height={15} /> : 'ID: 802390'}
      </Text>

      <Box className={styles.info}>
        <ProductColors
          colors={colors}
          currentColor={currentColor}
          onClick={onChangeColor}
          isLoading={isLoading}
        />

        <ProductCapacity
          capacities={capacities}
          currentCapacity={currentCapacity}
          onClick={onChangeCapacity}
          isLoading={isLoading}
        />

        <ProductPrice
          newPrice={newPrice}
          oldPrice={oldPrice}
          isLoading={isLoading}
          productId={id}
          productName={productName}
        />

        <ProductDetails features={features} isLoading={isLoading} />
      </Box>
    </Box>
  );
};
