import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import LeftIcon from '@assets/images/icons/chevron-left-icon.svg?react';
import RightIcon from '@assets/images/icons/chevron-right-icon.svg?react';

import { Box } from '@shared/base/Box';

import styles from './MainSlider.module.scss';
import { useMainSlider } from './useMainSlider';

interface MainSliderImage {
  id: string;
  urlSm: string;
  urlMd: string;
  urlLg: string;
  name: string;
}

interface MainSliderProps {
  images: MainSliderImage[];
}

export const MainSlider: React.FC<MainSliderProps> = ({ images }) => {
  const {
    showButtons,
    desktopBreakpoint,
    tabletBreakpoint,
    settings,
    onSwipeNext,
    onSwipePrev,
  } = useMainSlider();

  return (
    <Box className={styles.swiperContainer}>
      {showButtons && (
        <button
          onClick={onSwipePrev}
          className={cn(styles.swiperArrow, styles.prevArrow)}
        >
          <LeftIcon />
        </button>
      )}

      <Swiper className={styles.swiper} {...settings}>
        {images.map(({ id, urlSm, urlMd, urlLg, name }) => (
          <SwiperSlide key={id} className={styles.swiperSlide}>
            <NavLink to="/">
              <picture>
                <source
                  media={`(min-width:${desktopBreakpoint}px)`}
                  srcSet={urlLg}
                />
                <source
                  media={`(min-width:${tabletBreakpoint}px)`}
                  srcSet={urlMd}
                />
                <img src={urlSm} alt={name} />
              </picture>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>

      {showButtons && (
        <button
          onClick={onSwipeNext}
          className={cn(styles.swiperArrow, styles.nextArrow)}
        >
          <RightIcon />
        </button>
      )}
    </Box>
  );
};
