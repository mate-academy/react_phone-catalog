import React, { useMemo } from 'react';

import { useMedia } from '@shared/hooks/useMedia';

import styles from './Slider.module.scss';
import { Skeleton } from '../Skeleton';

export const SwiperSkeleton = () => {
  const { isMobile, isTablet, isDesktop } = useMedia();

  const { width, height } = useMemo(() => {
    if (isMobile) {
      return { width: 212, height: 439 };
    }

    if (isTablet) {
      return { width: 237, height: 512 };
    }

    return { width: 272, height: 506 };
  }, [isMobile, isDesktop, isTablet]);

  return (
    <Skeleton
      className={styles.swiperSkeleton}
      quantity={4}
      width={width}
      height={height}
    ></Skeleton>
  );
};
