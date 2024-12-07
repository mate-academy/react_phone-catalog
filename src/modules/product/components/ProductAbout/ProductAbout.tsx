import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { Skeleton } from '@shared/components/Skeleton';
import { useMedia } from '@shared/hooks/useMedia';
import { DefaultProps } from '@shared/types/common';

import { ProductSection } from '../ProductSection';
import styles from './ProductAbout.module.scss';

interface Description {
  title: string;
  text: string[];
}

interface ProductAboutProps extends DefaultProps {
  description?: Description[];
  isLoading?: boolean;
}

export const ProductAbout: React.FC<ProductAboutProps> = ({
  className,
  description,
  isLoading,
  ...rest
}) => {
  const { isMobile } = useMedia();

  if (isLoading) {
    return (
      <Box className={cn(styles.skeleton, className)}>
        <Skeleton
          height={isMobile ? 43 : 48}
          className={styles.skeletonHeader}
        />

        <Box className={styles.skeletonItem}>
          <Skeleton
            height={isMobile ? 20 : 26}
            className={styles.skeletonTitle}
          />
          <Skeleton
            height={isMobile ? 60 : 160}
            className={styles.skeletonDescription}
          />
        </Box>

        <Box className={styles.skeletonItem}>
          <Skeleton
            height={isMobile ? 20 : 26}
            className={styles.skeletonTitle}
          />
          <Skeleton
            height={isMobile ? 60 : 160}
            className={styles.skeletonDescription}
          />
        </Box>
      </Box>
    );
  }

  if (!description) {
    return null;
  }

  return (
    <ProductSection title="About" className={className} {...rest}>
      {description.map(({ title, text }) => (
        <Box key={title}>
          <Text variant="h4" className={styles.title}>
            {title}
          </Text>

          {text.map(item => (
            <Text key={item} variant="body" className={styles.content}>
              {item}
            </Text>
          ))}
        </Box>
      ))}
    </ProductSection>
  );
};
