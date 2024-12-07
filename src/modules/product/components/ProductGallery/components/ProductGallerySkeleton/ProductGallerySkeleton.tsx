import { useMemo } from 'react';

import { Box } from '@shared/base/Box';
import { Skeleton } from '@shared/components/Skeleton';
import { useMedia } from '@shared/hooks/useMedia';

import styles from './ProductGallerySkeleton.module.scss';

export const ProductGallerySkeleton = () => {
  const { isMobile, isTablet, isDesktop } = useMedia();

  const thumbHeight = useMemo(() => {
    if (isMobile) {
      return 50;
    }

    if (isTablet) {
      return 35;
    }

    return 80;
  }, [isMobile, isTablet]);

  return (
    <Box className={styles.skeleton}>
      <Skeleton
        fullWidth
        height={!isDesktop ? 288 : 464}
        className={styles.skeletonMain}
      />

      <Skeleton
        quantity={5}
        height={thumbHeight}
        className={styles.skeletonThumbs}
        itemClassName={styles.skeletonThumb}
        direction={isMobile ? 'row' : 'column'}
        gap={!isDesktop ? 8 : 16}
      />
    </Box>
  );
};
