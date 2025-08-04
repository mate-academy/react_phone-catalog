import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import { picturesSliderLinks } from '../../../../constants/navLinks';
import './PicturesSlider.scss';
import { useTranslation } from 'react-i18next';

export const PicturesSlider: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="slider">
      <div className="slider__content">
        <div className="slider__body">
          <button className={`slider__button slider__button--prev`}></button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: '.slider__button--prev',
              nextEl: '.slider__button--next',
            }}
            pagination={{ el: '.slider__pagination', clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={500}
            loop={true}
            className="slider__wrapper"
          >
            {picturesSliderLinks.map(link => (
              <SwiperSlide
                key={link.path}
                className={cn('slider__slide', {
                  'slider__slide--phones': link.path === 'phones',
                  'slider__slide--tablets': link.path === 'tablets',
                  'slider__slide--accessories': link.path === 'accessories',
                })}
              >
                <Link to={link.path} className="slider__slide-link">
                  {t(link.titleKey)}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className={`slider__button slider__button--next`}></button>
        </div>

        <div className="slider__pagination"></div>
      </div>
    </section>
  );
};
