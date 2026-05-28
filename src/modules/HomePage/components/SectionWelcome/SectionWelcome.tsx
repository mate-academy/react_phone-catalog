import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import { Slide } from './components/Slide/Slide';
import { Trans, useTranslation } from 'react-i18next';
import { ButtonSecond } from '@/components/ButtonSecond/ButtonSecond';

export const SectionWelcome = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const onResize = () => {
      swiperRef.current?.update();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return (
    <section>
      <h1 className={styles.title}>{t('HomeTitle.welcome')}</h1>

      <div className={styles.sliderWrapper}>
        <ButtonSecond iconFlipX className={styles.sliderButtonPrev}></ButtonSecond>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView="auto"
          loop
          navigation={{
            prevEl: `.${styles.sliderButtonPrev}`,
            nextEl: `.${styles.sliderButtonNext}`,
          }}
          pagination={{
            el: `.${styles.customPagination}`,
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: true,
          }}
          modules={[Navigation, Autoplay, Pagination]}
          className={styles.mySwiper}
        >
          <SwiperSlide className={styles.swiperSlide}>
            <Slide
              textButton={t('banners.phone.button')}
              imageMax640="img/banners/phone/phone-mb.png"
              image="img/banners/phone/phone-tb.png"
              alt="Phone image"
              textTitle={<Trans i18nKey="banners.phone.title" components={[<br />]} />}
              textTitle2="iPhone 17"
              paragraph={t('banners.phone.p')}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <Slide
              textButton={t('banners.tablets.button')}
              imageMax640="img/banners/tablet/tablet-mb.png"
              image="img/banners/tablet/tablet-tb.png"
              alt="tablet image"
              textTitle={<Trans i18nKey="banners.tablets.title" components={[<br />]} />}
              textTitle2="iPad 11"
              paragraph={t('banners.tablets.p')}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <Slide
              textButton={t('banners.accessories.button')}
              imageMax640="img/banners/accessories/accessories-mb.png"
              image="img/banners/accessories/accessories-tb.png"
              alt="accessories image"
              textTitle={<Trans i18nKey="banners.accessories.title" components={[<br />]} />}
              textTitle2="Apple Watch!"
              paragraph={t('banners.accessories.p')}
            />
          </SwiperSlide>

        </Swiper>
        <ButtonSecond className={styles.sliderButtonNext}></ButtonSecond>
      </div>
      <div className={styles.customPagination}></div>
    </section>
  );
};
