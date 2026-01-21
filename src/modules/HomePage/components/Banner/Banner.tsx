import styles from './Banner.module.scss';
import banner01 from './../../../../../public/img/banner01.webp';
import banner02 from './../../../../../public/img/banner02.webp';
import banner03 from './../../../../../public/img/banner-accessories.png';
import banner04 from './../../../../../public/img/banner-phones.png';
import banner05 from './../../../../../public/img/banner-tablets.png';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Banner = () => {
  return (
    <section className={styles.banner}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.banner__swiper}>
        <Swiper
          loop={true}
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: `.${styles.next}`,
            prevEl: `.${styles.prev}`,
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img src={banner01} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner02} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner03} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner04} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner05} alt="" />
          </SwiperSlide>
          <button className={styles.prev}>‹</button>
          <button className={styles.next}>›</button>
        </Swiper>
      </div>
    </section>
  );
};
