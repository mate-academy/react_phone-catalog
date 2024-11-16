import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';

import LeftIcon from '@assets/images/icons/chevron-left-icon.svg?react';
import RightIcon from '@assets/images/icons/chevron-right-icon.svg?react';

import { Box } from '@shared/base/Box';
import { IconButton } from '@shared/base/IconButton';
import { Text } from '@shared/base/Text';

import styles from './Slider.module.scss';
import { useSlider, UseSliderProps } from './useSlider';
import { Skeleton } from '../Skeleton';
import { SwiperSkeleton } from './SwiperSkeleton';

export interface SliderProps<TData> extends UseSliderProps {
  data: TData[];
  isLoading?: boolean;
  isInitialLoading?: boolean;
  extractKey: (data: TData) => string | number;
  renderSlide: (data: TData) => React.ReactNode;
}

export const Slider = <TData,>({
  data,
  isLoading,
  extractKey,
  onSwiperReachStart,
  onSwiperReachEnd,
  renderSlide,
  isInitialLoading,
}: SliderProps<TData>) => {
  const { settings, isBeginning, isEnd, onButtonNext, onButtonPrev } =
    useSlider({
      onSwiperReachStart,
      onSwiperReachEnd,
    });

  return (
    <Box className={styles.swiperContainer}>
      <Box className={cn('container', styles.swiperHead)}>
        <Text variant="h2" className={styles.title}>
          Brand new models
        </Text>

        <Box className={styles.swiperControls}>
          {isLoading ? (
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
              <Swiper className={styles.swiper} {...settings}>
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
