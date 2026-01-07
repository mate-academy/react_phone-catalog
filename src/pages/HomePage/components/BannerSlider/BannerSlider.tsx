import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './BannerSlider.module.scss';
import { ArrowIcon } from '../../../../components/icons';
import useLanguageStore from '../../../../stores/useLanguageStore';

const slides = [
  {
    image: '/src/images/iphone-17-pro-4k.webp',
    // imageLarge: '/src/images/hero-iphone-17-pro-large-empty.png',
    alt: 'iPhone 14 Pro',
    titleKey: 'banner_iphone_title',
    subtitleKey: 'banner_iphone_subtitle',
    extraKey: 'banner_iphone_extra',
    link: '/phones/apple-iphone-17-pro-1tb-orange',
  },
  {
    image: '/src/images/apple-iPad-Pro-13-4k.webp',
    // imageLarge: '/src/images/hero-apple-iPad-Pro-13-large-empty.png',
    alt: 'iPad 13 Pro',
    titleKey: 'banner_ipad_title',
    subtitleKey: 'banner_ipad_subtitle',
    extraKey: 'banner_ipad_extra',
    link: '/tablets/apple-ipad-pro-13-m4-2024-2tb-space-black',
  },
  {
    image: '/src/images/apple-watch-ultra-3-4k.webp',
    // imageLarge: '/src/images/hero-apple-watch-ultra-3-large-empty.png',
    alt: 'apple watch',
    titleKey: 'banner_watch_title',
    subtitleKey: 'banner_watch_subtitle',
    extraKey: 'banner_watch_extra',
    imageClass: styles.watchImage,
    link: '/accessories/apple-watch-ultra-3-49mm-blue-ocean',
  },
];

const BannerSlider: React.FC = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const { t } = useLanguageStore();

  return (
    <div>
      <div className={styles.bannerSlider}>
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          aria-label="Previous"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <ArrowIcon direction="left" />
        </button>

        <div className={styles.swiperOuter}>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            preloadImages={true}
            updateOnImagesReady={true}
            spaceBetween={0}
            slidesPerView={1}
            speed={700}
            className={styles.swiperWrapper}
            loop={true}
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
            pagination={{
              clickable: true,
              bulletClass: styles.customBullet,
              bulletActiveClass: styles.activeBullet,
              el: `.${styles.customPagination}`,
            }}
          >
            {slides.map((slide, index) => {
              const isPriority = index === 0;

              return (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <Link to={slide.link} className={styles.slide}>
                    <div className={styles.slideLeft}>
                      <div className={styles.textContainer}>
                        <h2 className={styles.slideSubtitle}>
                          {t(slide.subtitleKey)}
                        </h2>

                        <span className={styles.slideExtra}>
                          {t(slide.extraKey)}
                        </span>
                      </div>

                      <span className={styles.linkButton}>
                        {t('banner_order_now')}
                      </span>
                    </div>

                    <div className={styles.slideRigth}>
                      <h2
                        className={`${styles.slideTitle} ${slide.imageClass || ''}`}
                      >
                        {t(slide.titleKey)}
                      </h2>

                      <img
                        className={`${styles.slideImg} ${slide.imageClass || ''}`}
                        src={slide.image}
                        alt={slide.alt}
                        loading={isPriority ? 'eager' : 'lazy'}
                        fetchPriority={isPriority ? 'high' : 'low'}
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          aria-label="Next"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <ArrowIcon />
        </button>
      </div>

      <div className={styles.customPagination}></div>
    </div>
  );
};

export default BannerSlider;

/* <picture className={styles.slidePicture}>
  <source
    media="(min-width:768px)"
    srcSet={slide.imageLarge}
  />
  <img
    className={styles.slideImg}
    src={slide.image}
    alt={slide.alt}
  />
</picture> */
