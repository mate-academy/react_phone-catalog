import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { IconButton } from '@/shared/components/Buttons/components/IconButton';
import { ArrowIcon } from '@/shared/assets/icons';
import { FishingImg } from '@/shared/assets/error-img';
// eslint-disable-next-line max-len
import bannerId1 from '@/shared/assets/home-page-img/banner/banner-accessories.png';
import bannerId2 from '@/shared/assets/home-page-img/banner/banner-tablets.png';
import bannerId3 from '@/shared/assets/home-page-img/banner/banner-phones.png';

import cn from 'classnames';
import 'swiper/swiper.css';
import './PromoSlider.scss';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';

const BANNERS = [
  {
    id: 1,
    src: bannerId1,
    alt: 'Accessories Promo Banner',
  },
  { id: 2, src: bannerId2, alt: 'Tablets Promo Banner' },
  { id: 3, src: bannerId3, alt: 'Phones Promo Banner' },
];

type Props = {
  hasError?: boolean;
};

export const PromoSlider: React.FC<Props> = ({ hasError }) => {
  const alertProps = hasError ? { role: 'alert' as const } : {};
  const isOnline = useOnlineStatus();

  return (
    <div
      className={cn('promo-slider', {
        'promo-slider--error': hasError || !isOnline,
      })}
      {...alertProps}
    >
      {hasError || !isOnline ? (
        <>
          <FishingImg
            className="promo-slider__placeholder-icon"
            aria-hidden="true"
          />
          <p className="promo-slider__placeholder-text">
            Promo content is temporarily unavailable
          </p>
        </>
      ) : (
        <>
          <IconButton
            className="promo-slider__btn promo-slider__btn--prev"
            aria-label="Previous slide"
          >
            <ArrowIcon className="promo-slider__icon" />
          </IconButton>

          <IconButton
            className="promo-slider__btn promo-slider__btn--next"
            aria-label="Next slide"
          >
            <ArrowIcon className="promo-slider__icon" />
          </IconButton>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: '.promo-slider__btn--prev',
              nextEl: '.promo-slider__btn--next',
            }}
            className="promo-slider__swiper"
          >
            {BANNERS.map(banner => (
              <SwiperSlide className="promo-slider__slide" key={banner.id}>
                <img
                  className="promo-slider__img"
                  src={banner.src}
                  alt={banner.alt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};
