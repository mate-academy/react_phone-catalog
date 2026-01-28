// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Swiper.scss';

import styles from './Banner.module.scss';
import bannerMain from './../../images/img/banner.jpg';
import bannerAccess from './../../images/img/banner-accessories.png';
import bannerPhones from './../../images/img/banner-phones.png';
import bannerTablets from './../../images/img/banner-tablets.png';

const images = [bannerMain, bannerAccess, bannerPhones, bannerTablets];
// eslint-disable @typescript-eslint/naming-convention
const { banner, bannerTitle } = styles;

export const Banner = () => {
  return (
    <section className={banner}>
      <div className="container">
        <h2 className={bannerTitle}>Welcome to Nice Gadgets store!</h2>
        <Swiper
          className="my-swiper"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt="slider" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
