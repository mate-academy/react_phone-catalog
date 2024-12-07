import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';

import LeftIcon from '@assets/images/icons/chevron-left-icon.svg?react';
import RightIcon from '@assets/images/icons/chevron-right-icon.svg?react';

import { Box } from '@shared/base/Box';
import { IconButton } from '@shared/base/IconButton';
import { Text } from '@shared/base/Text';

import { Skeleton } from '../Skeleton';
import { SwiperSkeleton } from './components/SwiperSkeleton';
import { useSlider, UseSliderProps } from './hooks/useSlider';
import styles from './Slider.module.scss';

export interface SliderProps<TData> extends UseSliderProps {
  title: string;
  data: TData[];
  isLoading?: boolean;
  isInitialLoading?: boolean;
  extractKey: (data: TData) => string | number;
  renderSlide: (data: TData) => React.ReactNode;
}

export const Slider = <TData,>({
  data,
  title,
  isLoading,
  isInitialLoading,
  extractKey,
  renderSlide,
  onSlideChange,
}: SliderProps<TData>) => {
  const { isBeginning, isEnd, settings, onButtonNext, onButtonPrev } =
    useSlider({
      onSlideChange,
    });

  const showControlsSkeleton = isInitialLoading || isLoading;

  return (
    <Box className={styles.swiperContainer}>
      <Box className={cn('container', styles.swiperHead)}>
        <Text variant="h2" className={styles.title}>
          {title}
        </Text>

        <Box className={styles.swiperControls}>
          {showControlsSkeleton ? (
            <Skeleton
              quantity={2}
              height={32}
              width={32}
              className={styles.swiperControlsSkeleton}
            />
          ) : (
            <>
              <IconButton
                Icon={LeftIcon}
                onClick={onButtonPrev}
                disabled={isBeginning}
              />
              <IconButton
                Icon={RightIcon}
                onClick={onButtonNext}
                disabled={isEnd}
              />
            </>
          )}
        </Box>
      </Box>

      <Box style={{ overflow: 'hidden' }}>
        <Box className="container">
          <Box style={{ gridColumn: '1 / -1' }}>
            {isInitialLoading ? (
              <SwiperSkeleton />
            ) : (
              <Swiper
                className={cn(styles.swiper, { [styles.loading]: isLoading })}
                {...settings}
              >
                {data.map((item, idx) => {
                  const key = extractKey(item);

                  return (
                    <SwiperSlide key={key} virtualIndex={idx}>
                      {renderSlide(item)}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
