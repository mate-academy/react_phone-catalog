/* eslint-disable react/display-name */
import { memo, useMemo } from 'react';
import { RoutePaths } from '../../../shared/config/routeConfig';
import { SwiperOptions } from 'swiper/types';
import cls from './mainSlider.module.scss';
import { ISlidesData } from '../model/types';
import { SlideContent, Slider } from '../../../shared/ui/Slider/Slider';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import icons from '../../../shared/styles/icons.module.scss';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Button, ButtonSize, ButtonTheme } from '../../../shared/ui/forms';

interface MainSliderProps {
  className?: string;
}

export const MainSlider = memo(({ className }: MainSliderProps) => {
  const sliderOptions = useMemo<SwiperOptions>(
    () => ({
      pagination: {
        el: `.${cls['main-slider__pagination']}`,
        bulletClass: `${cls['main-slider__pagination-bullet']}`,
        bulletActiveClass: `${cls['main-slider__pagination-bullet-active']}`,
        clickable: true,
      },
      navigation: {
        prevEl: `.${cls['main-slider__button_prev']}`,
        nextEl: `.${cls['main-slider__button_next']}`,
      },
      slidesPerView: 1,
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
      },
    }),
    [],
  );

  const slidesData = useMemo<ISlidesData[]>(
    () => [
      {
        id: 0,
        link: `${RoutePaths.products}phones`,
        banner: '/img/banner.png',
      },
      {
        id: 1,
        link: `${RoutePaths.products}phones`,
        banner: '/img/banner-phones.png',
      },
      {
        id: 3,
        link: `${RoutePaths.products}tablets`,
        banner: '/img/banner-tablets.png',
      },
      {
        id: 4,
        link: `${RoutePaths.products}accessories`,
        banner: '/img/banner-accessories.png',
      },
    ],
    [],
  );

  const slidesContent = useMemo<SlideContent[]>(
    () =>
      slidesData.map(slide => ({
        id: slide.id,
        content: (
          <Link
            className={`${cls['slide-main__slide-content']}`}
            to={slide.link}
          >
            <img
              src={slide.banner}
              className={`${cls['slide-main-slide__banner']}`}
              alt={slide.link}
            />
          </Link>
        ),
      })),
    [slidesData],
  );

  return (
    <div className={`${className} ${cls['main-slider']}`}>
      <div className={cls['main-slider__body']}>
        <Button
          theme={ButtonTheme.SQUARE}
          className={classNames(
            cls['main-slider__button'],
            cls['main-slider__button_prev'],
            icons['_icon-arrow'],
          )}
          size={ButtonSize.FULL}
        />

        <Slider
          options={sliderOptions}
          slidesContent={slidesContent}
          className={`${cls['main-slider__slider']}`}
          classNameSlide={`${cls['slider-main__slide']}`}
          modules={[Pagination, Navigation, Autoplay]}
        />

        <Button
          theme={ButtonTheme.SQUARE}
          className={classNames(
            cls['main-slider__button'],
            cls['main-slider__button_next'],
            icons['_icon-arrow'],
          )}
          size={ButtonSize.FULL}
        />
      </div>
      <div className={cls['main-slider__pagination']}></div>
    </div>
  );
});
