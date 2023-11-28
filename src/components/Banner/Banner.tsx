import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { bannerImgs } from '../../variables/bannerImgs';
import { BannerImg } from './BannerImg';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export const Banner = () => {
  return (
    <section className="section banner">
      <div className="section__container">
        <Swiper
          slidesPerView={1}
          speed={700}
          navigation
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="banner__swiper"
        >
          {bannerImgs.map((img) => (
            <SwiperSlide key={img.id}>
              <BannerImg img={img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
