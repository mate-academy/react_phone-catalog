import { Box } from '@shared/base/Box';
import { ColorChip } from '@shared/base/ColorChip';
import { List } from '@shared/base/List';
import { ListItem } from '@shared/base/ListItem';
import { Skeleton } from '@shared/components/Skeleton';

import styles from './ProductColors.module.scss';
import { ProductInfoSection } from '../ProductInfoSection';

export interface ProductColorsProps {
  currentColor?: string;
  colors?: string[];
  isLoading?: boolean;
  onClick?: (color: string) => void;
}

export const ProductColors: React.FC<ProductColorsProps> = ({
  colors,
  currentColor,
  isLoading,
  onClick,
}) => {
  if (isLoading) {
    return (
      <Box className={styles.skeleton}>
        <Skeleton width={97} height={15} />

        <Skeleton
          quantity={3}
          className={styles.circles}
          itemClassName={styles.circle}
          height={32}
          gap={8}
          round
        />
      </Box>
    );
  }

  if (!colors) {
    return null;
  }

  return (
    <ProductInfoSection label="Available colors">
      <List className={styles.colors}>
        {colors.map(color => (
          <ListItem key={color}>
            <ColorChip
              color={color}
              selected={currentColor === color}
              onClick={onClick}
            />
          </ListItem>
        ))}
      </List>
    </ProductInfoSection>
  );
};
