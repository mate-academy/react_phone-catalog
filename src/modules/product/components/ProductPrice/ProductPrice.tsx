import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { AddToCartBtn } from '@shared/components/AddToCartBtn';
import { FavoritesButton } from '@shared/components/FavoritesButton';
import { Skeleton } from '@shared/components/Skeleton';
import { useMedia } from '@shared/hooks/useMedia';
import { formatNumberToCurrency } from '@shared/utils/currencyFormatters';

import styles from './ProductPrice.module.scss';

export interface ProductPriceProps {
  productName?: string;
  newPrice?: number;
  oldPrice?: number;
  productId?: string;
  isLoading?: boolean;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  newPrice,
  oldPrice,
  productId,
  isLoading,
  productName = 'product',
}) => {
  const { isMobile } = useMedia();

  if (isLoading) {
    return (
      <Box className={styles.skeleton}>
        <Skeleton width={100} height={isMobile ? 31 : 41} />

        <Skeleton fullWidth height={48} />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.price}>
        {newPrice && (
          <Text variant="h2">{formatNumberToCurrency(newPrice)}</Text>
        )}

        {oldPrice && (
          <Text
            className={styles.old}
            variant={newPrice ? 'crossed-out' : 'h2'}
          >
            {formatNumberToCurrency(oldPrice)}
          </Text>
        )}
      </Box>

      <Box className={styles.buttons}>
        <AddToCartBtn
          className={styles.addToCartBtn}
          productId={productId}
          title={productName}
          size="lg"
        />

        <FavoritesButton productId={productId} title={productName} size="lg" />
      </Box>
    </Box>
  );
};
