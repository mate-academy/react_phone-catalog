import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { List } from '@shared/base/List';
import { ListItem } from '@shared/base/ListItem';
import { Text } from '@shared/base/Text';
import { Skeleton } from '@shared/components/Skeleton';
import { useMedia } from '@shared/hooks/useMedia';
import { DefaultProps } from '@shared/types/common';

import { ProductSection } from '../ProductSection';
import styles from './ProductTechSpecs.module.scss';
import { SPEC_CONFIG } from './utils/spec.config';

interface ProductTechSpecsProps extends DefaultProps {
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  builtInMemory?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  isLoading?: boolean;
}

export const ProductTechSpecs: React.FC<ProductTechSpecsProps> = ({
  isLoading,
  style,
  className,
  ...specs
}) => {
  const { isMobile } = useMedia();

  if (isLoading) {
    return (
      <Box className={cn(styles.skeleton, className)}>
        <Skeleton
          height={isMobile ? 43 : 48}
          className={styles.skeletonHeader}
        />

        <Box className={styles.skeletonList}>
          <Skeleton fullWidth height={21} />
          <Skeleton fullWidth height={21} />
          <Skeleton fullWidth height={21} />
        </Box>
      </Box>
    );
  }

  if (!Object.keys(specs).length) {
    return null;
  }

  return (
    <ProductSection title="Tech specs" className={className} style={style}>
      <List className={styles.list}>
        {SPEC_CONFIG.map(({ key, title }) => {
          const specItem = specs[key as keyof typeof specs];

          if (!specItem) {
            return null;
          }

          return (
            <ListItem key={key} className={styles.row}>
              <Text variant="body" className={styles.title}>
                {title}
              </Text>

              <Text variant="body" className={styles.value}>
                {Array.isArray(specItem) ? specItem.join(', ') : specItem}
              </Text>
            </ListItem>
          );
        })}
      </List>
    </ProductSection>
  );
};
