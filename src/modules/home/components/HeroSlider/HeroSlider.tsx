import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import LeftIcon from '@assets/images/icons/chevron-left-icon.svg?react';
import RightIcon from '@assets/images/icons/chevron-right-icon.svg?react';

import { Box } from '@shared/base/Box';
import { DefaultProps } from '@shared/types/common';
import { generateImgUrls } from '@shared/utils/helpers';

import styles from './HeroSlider.module.scss';
import { useHeroSlider } from './useHeroSlider';

interface HeroSliderImage {
  id: string;
  href: string;
  url: string;
  name: string;
}

interface HeroSliderProps extends DefaultProps {
  images: HeroSliderImage[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  images,
  className,
  ...rest
}) => {
  const {
    showButtons,
    desktopBreakpoint,
    tabletBreakpoint,
    settings,
    onSwipeNext,
    onSwipePrev,
  } = useHeroSlider();

  return (
    <Box className={cn(styles.swiperContainer, className)} {...rest}>
      {showButtons && (
        <button
          onClick={onSwipePrev}
          className={cn(styles.swiperArrow, styles.prevArrow)}
        >
          <LeftIcon />
        </button>
      )}

      <Swiper className={styles.swiper} {...settings}>
        {images.map(({ id, url, href, name }) => {
          const [urlSm, urlMd, urlLg] = generateImgUrls(url);

          return (
            <SwiperSlide key={id} className={styles.swiperSlide}>
              <NavLink to={href}>
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
          );
        })}
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
