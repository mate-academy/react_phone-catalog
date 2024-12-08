import { Box } from '@shared/base/Box';
import { Button } from '@shared/base/Button';
import { List } from '@shared/base/List';
import { Skeleton } from '@shared/components/Skeleton';

import { ProductInfoSection } from '../ProductInfoSection';
import styles from './ProductCapacity.module.scss';

export interface ProductCapacityProps {
  capacities?: string[];
  currentCapacity?: string;
  isLoading?: boolean;
  onClick?: (capacity: string) => void;
}

export const ProductCapacity: React.FC<ProductCapacityProps> = ({
  capacities,
  currentCapacity,
  isLoading,
  onClick,
}) => {
  if (isLoading) {
    return (
      <Box className={styles.skeleton}>
        <Skeleton width={97} height={15} />

        <Skeleton
          quantity={3}
          className={styles.buttons}
          itemClassName={styles.button}
          height={32}
          gap={8}
        />
      </Box>
    );
  }

  if (!capacities) {
    return null;
  }

  const handleClick = (capacity: string) => {
    if (onClick) {
      onClick(capacity);
    }
  };

  return (
    <ProductInfoSection label="Select capacity">
      <List className={styles.capacities}>
        {capacities.map(capacity => {
          const isActive = capacity === currentCapacity;

          return (
            <Button
              key={capacity}
              size="sm"
              variant="secondary"
              selected={isActive}
              onClick={() => handleClick(capacity)}
            >
              {capacity}
            </Button>
          );
        })}
      </List>
    </ProductInfoSection>
  );
};
