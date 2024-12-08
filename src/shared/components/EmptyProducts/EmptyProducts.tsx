import { useMemo } from 'react';

import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { DefaultProps } from '@shared/types/common';

import styles from './EmptyProducts.module.scss';

interface EmptyProductsProps extends DefaultProps {
  description?: string;
  variant?: 'products' | 'cart';
}

export const EmptyProducts: React.FC<EmptyProductsProps> = ({
  className,
  description = 'Nothing was found',
  variant = 'products',
}) => {
  const imgSrc = useMemo(
    () =>
      ({
        products: 'img/product-not-found.png',
        cart: 'img/cart-is-empty.png',
      })[variant],
    [variant],
  );

  return (
    <Box className={cn(styles.container, className)}>
      <Text variant="h2">{description}</Text>

      <img src={imgSrc} alt={description} />
    </Box>
  );
};
