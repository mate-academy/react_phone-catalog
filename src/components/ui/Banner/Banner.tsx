import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.scss';

const base = import.meta.env.BASE_URL;

const slides = [
  { desktop: 'banner-desktop-1.png', phone: 'banner-phone-1.png', alt: 'iPhone 14 Pro' },
  { desktop: 'banner-desktop-2.png', phone: 'banner-phone-2.png', alt: 'New Models' },
  { desktop: 'banner-desktop-3.png', phone: 'banner-phone-3.png', alt: 'Tablets' },
  { desktop: 'banner-desktop-4.png', phone: 'banner-phone-4.png', alt: 'Accessories' },
];

export const Banner = () => {
  return (
    <div className="banner">
      <button className="banner__arrow banner__arrow--prev swiper-btn-prev" />

      <div className="banner__slider">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={800}
          autoplay={{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, el: '.banner__pagination' }}
          navigation={{ prevEl: '.swiper-btn-prev', nextEl: '.swiper-btn-next' }}
        >
          {slides.map(({ desktop, phone, alt }) => (
            <SwiperSlide key={desktop}>
              <picture>
                <source
                  media="(max-width: 639px)"
                  srcSet={`${base}img/banners/${phone}`}
                />
                <img
                  src={`${base}img/banners/${desktop}`}
                  alt={alt}
                  className="banner__image"
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button className="banner__arrow banner__arrow--next swiper-btn-next" />
      <div className="banner__pagination" />
    </div>
  );
};
