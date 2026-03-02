import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.scss';

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
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: '.banner__pagination',
          }}
          navigation={{
            prevEl: '.swiper-btn-prev',
            nextEl: '.swiper-btn-next',
          }}
        >
          <SwiperSlide>
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet="/img/banners/banner-phone-1.png"
              />
              <img
                src="/img/banners/banner-desktop-1.png"
                alt="iPhone 14 Pro"
                className="banner__image"
              />
            </picture>
          </SwiperSlide>

          <SwiperSlide>
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet="/img/banners/banner-phone-2.png"
              />
              <img
                src="/img/banners/banner-desktop-2.png"
                alt="New Models"
                className="banner__image"
              />
            </picture>
          </SwiperSlide>

          <SwiperSlide>
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet="/img/banners/banner-phone-3.png"
              />
              <img
                src="/img/banners/banner-desktop-3.png"
                alt="Tablets"
                className="banner__image"
              />
            </picture>
          </SwiperSlide>

          <SwiperSlide>
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet="/img/banners/banner-phone-4.png"
              />
              <img
                src="/img/banners/banner-desktop-4.png"
                alt="Accessories"
                className="banner__image"
              />
            </picture>
          </SwiperSlide>
        </Swiper>
      </div>

      <button className="banner__arrow banner__arrow--next swiper-btn-next" />

      <div className="banner__pagination" />
    </div>
  );
};
