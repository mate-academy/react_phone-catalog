import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Button } from '@shared/base/Button';
import { Text } from '@shared/base/Text';
import { Skeleton } from '@shared/components/Skeleton';
import { DefaultProps } from '@shared/types/common';
import { StoredProductModel } from '@shared/types/Product/Product.model';
import { formatNumberToCurrency } from '@shared/utils/currencyFormatters';

import styles from './CartTotal.module.scss';

interface CartTotalProps extends DefaultProps {
  products: StoredProductModel[] | null;
  isLoading?: boolean;
}

export const CartTotal: React.FC<CartTotalProps> = ({
  className,
  products,
  isLoading,
  ...rest
}) => {
  if (isLoading) {
    return <Skeleton fullWidth height={183} className={className} />;
  }

  if (!products || !products.length) {
    return null;
  }

  const { totalLength, totalSum } = products.reduce(
    (acc, product) => {
      const finalPrice =
        (product.priceDiscount ?? product.priceRegular) * product.quantity;

      return {
        totalLength: acc.totalLength + product.quantity,
        totalSum: acc.totalSum + finalPrice,
      };
    },
    { totalLength: 0, totalSum: 0 },
  );

  return (
    <Box className={cn(styles.container, className)} {...rest}>
      <Box className={styles.header}>
        <Text variant="h2">{formatNumberToCurrency(totalSum)}</Text>
        <Text variant="body">Total for {totalLength} items</Text>
      </Box>

      <Button className={styles.checkout} size="lg">
        Checkout
      </Button>
    </Box>
  );
};
