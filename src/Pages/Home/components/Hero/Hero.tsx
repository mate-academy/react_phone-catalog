// ..Hero.jsx
import styles from './Hero.module.scss';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import arrowLeft from '/icons/arrow-left.svg';
import arrowRight from '/icons/arrow-right.svg';
import mainBanner1 from '../../../../assets/images/banner-01.png';
import mainBanner2 from '../../../../assets/images/banner-02.png';
import mainBanner3 from '../../../../assets/images/banner-03.png';

export const Hero = () => {
  const banners = [mainBanner1, mainBanner2, mainBanner3];

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.sliderBlock}>
        {/* Кнопка НАЗАД */}
        <div className="swiper-button-prev">
          <img className="icon" src={arrowLeft} alt="arrow-left" />
        </div>

        {/* Сам слайдер із картинками */}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          className={styles.swiperContainer}
        >
          {banners.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <img
                src={imgSrc}
                alt={`Promo banner ${index + 1}`}
                className={styles.bannerImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кнопка ВПЕРЕД */}
        <div className="swiper-button-next">
          <img className="icon" src={arrowRight} alt="arrow-right" />
        </div>
      </div>

      <div className="swiper-pagination"></div>
    </section>
  );
};
