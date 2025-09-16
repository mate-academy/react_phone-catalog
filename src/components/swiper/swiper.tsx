import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import styles from './swiper.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

export const MySwiper = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      pagination={{ clickable: true, type: 'bullets', dynamicBullets: true }}
      navigation={{
        nextEl: `.${styles.swiper__next}`,
        prevEl: `.${styles.swiper__prev}`,
      }}
      // autoplay={{ delay: 5000, disableOnInteraction: false }}
      // loop={true}
      className={`${styles.mySwiper} ${styles.swiper}`}
    >
      <SwiperSlide className={`${styles.swiper__slide}`}>
        <div className={`${styles.swiper__slideContentMobile}`}>
          <img
            src="public/img/slider/slider-1.png"
            alt="iPhone 14"
            className={`${styles.swiper__image} ${styles['swiper__image--mobile-main']}`}
          />

          <h2 className={`${styles.swiper__orderTitle} ${styles['swiper__orderTitle--mobile']}`}>
            {t('titles.nowInStore')}
          </h2>

          <div
            className={`${styles.swiper__slideDescription} ${styles['swiper__slideDescription--mobile']}`}
          >
            <h2 className={`${styles.swiper__slideTitle}`}>iPhone 14 Pro</h2>
            <p className={`${styles.swiper__slideText}`}>{t('titles.sliderText')}</p>
          </div>
        </div>

        <div className={`${styles.swiper__slideContentTablet}`}>
          <div className={styles.swiper__order}>
            <div className={styles.swiper__orderHead}>
              <h2
                className={`${styles.swiper__orderTitle} ${language === 'UA' && styles['swiper__orderTitle--ua']}`}
              >
                {t('titles.nowInStore')}
              </h2>
              <p className={styles.swiper__orderText}>{t('titles.beTheFirst')}</p>

              <div className={`${styles.swiper__slideDescription}`}>
                <h2 className={`${styles.swiper__slideTitle}`}>iPhone 14 Pro</h2>
                <p className={`${styles.swiper__slideText}`}>{t('titles.sliderText')}</p>
              </div>
            </div>

            <Link to="/phones" className={styles.swiper__orderButton}>
              {t('buttonText.order')}
            </Link>
          </div>

          <img
            src="public/img/slider/slider-1.png"
            alt="iPhone 14"
            className={`${styles.swiper__image} ${styles['swiper__image--tabletOrder']}`}
          />
        </div>
      </SwiperSlide>

      <SwiperSlide className={styles.swiper__slide}>
        <img
          src="public/img/slider/slider-2.jpg"
          alt="iPhone 14"
          className={`${styles.swiper__image} ${styles['swiper__image--mobile']}`}
        />

        <img
          src="public/img/slider/swiper-tablet-2.webp"
          alt="iPhone 14"
          className={`${styles.swiper__image} ${styles['swiper__image--tablet']}`}
        />
      </SwiperSlide>

      <SwiperSlide className={styles.swiper__slide}>
        <img
          src="public/img/slider/slider-3.webp"
          alt="iPhone 14"
          className={`${styles.swiper__image} ${styles['swiper__image--mobile']}`}
        />

        <img
          src="public/img/slider/slider-tablet-3.jpeg"
          alt="iPhone 14"
          className={`${styles.swiper__image} ${styles['swiper__image--tablet']}`}
        />
      </SwiperSlide>

      <div
        className={`${styles.swiper__prev} ${theme === 'light' && styles['swiper__prev--lightTheme']}`}
      ></div>
      <div
        className={`${styles.swiper__next} ${theme === 'light' && styles['swiper__next--lightTheme']}`}
      ></div>
    </Swiper>
  );
};
