import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './BannerSlider.module.scss';

// rightTitle: 'iPhone 14 Pro',
// rightSubtitle: 'Pro. Beyond.',

const slides = [
  {
    title: 'Now available in our store! 👌',
    subtitle: 'Be the first!',
    btnText: 'ORDER NOW',
    image: '/src/images/hero-iphone-17-pro.jpg',
    rightTitle: '',
    rightSubtitle: '',
  },
  {
    title: 'The future is here 🚀',
    subtitle: 'Discover iPad Pro 13',
    btnText: 'SHOP NOW',
    image: '/src/images/hero-apple-iPad-Pro-13.jpg',
    rightTitle: 'iPad Pro',
    rightSubtitle: 'Power meets portability.',
  },
  {
    title: 'The future is here 🚀',
    subtitle: 'Discover apple watch ultra 3',
    btnText: 'SHOP NOW',
    image: '/src/images/hero-apple-watch-ultra-3.jpg',
    rightTitle: 'iPad Pro',
    rightSubtitle: 'Power meets portability.',
  },
];

const BannerSlider: React.FC = () => {
  return (
    <div className={styles.bannerSlider}>
      <button className={`${styles.navBtn} ${styles.prevBtn}`}>
        <img
          className={styles.navBtnImg}
          src="src/images/icons/arrow-left-black.svg"
          alt="arrow right"
        />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
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
        }}
        navigation={{
          nextEl: `.${styles.nextBtn}`,
          prevEl: `.${styles.prevBtn}`,
        }}
        // breakpoints={{
        //   // коли ширина екрану >= 768px
        //   640: {
        //     spaceBetween: 16, // Зберігаємо 16px
        //   },
        //   // коли ширина екрану >= 1024px (для десктопу)
        //   1024: {
        //     spaceBetween: 16,
        //   },
        // }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div className={styles.slide}>
              <div className={styles.left}>
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button>{slide.btnText}</button>
              </div>

              <div className={styles.right}>
                <div className={styles.rightContent}>
                  {slide.rightTitle && <h3>{slide.rightTitle}</h3>}
                  {slide.rightSubtitle && <p>{slide.rightSubtitle}</p>}
                </div>
                <img src={slide.image} alt={slide.rightTitle} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className={`${styles.navBtn} ${styles.nextBtn}`}>
        <img
          className={styles.navBtnImg}
          src="src/images/icons/arrow-right-black.svg"
          alt="arrow right"
        />
      </button>
    </div>
  );
};

export default BannerSlider;
