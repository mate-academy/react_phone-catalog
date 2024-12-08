import { useMemo } from 'react';

import { useMedia } from '@shared/hooks/useMedia';

import styles from './SwiperSkeleton.module.scss';
import { Skeleton } from '../../Skeleton';

export const SwiperSkeleton = () => {
  const { isMobile, isTablet } = useMedia();

  const { width, height } = useMemo(() => {
    if (isMobile) {
      return { width: 212, height: 438 };
    }

    if (isTablet) {
      return { width: 237, height: 513 };
    }

    return { width: 272, height: 509 };
  }, [isMobile, isTablet]);

  return (
    <Skeleton
      className={styles.swiperSkeleton}
      quantity={4}
      width={width}
      height={height}
    ></Skeleton>
  );
};
