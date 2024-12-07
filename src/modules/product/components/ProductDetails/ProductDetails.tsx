import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { Skeleton } from '@shared/components/Skeleton';

import styles from './ProductDetails.module.scss';

interface FeatureProps {
  title: string;
  value: string;
}

export interface ProductDetailsProps {
  features?: FeatureProps[] | null;
  isLoading?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  features,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Box className={styles.skeleton}>
        <Skeleton quantity={2} height={15} />
        <Skeleton quantity={2} height={15} />
        <Skeleton quantity={2} height={15} />
        <Skeleton quantity={2} height={15} />
      </Box>
    );
  }

  if (!features) {
    return null;
  }

  return (
    <Box className={styles.features}>
      {features
        .filter(({ value }) => !!value)
        .map(({ title: featureTitle, value }) => (
          <Box key={featureTitle} className={styles.featureRow}>
            <Text variant="small">{featureTitle}</Text>
            <Text variant="small">{value}</Text>
          </Box>
        ))}
    </Box>
  );
};
