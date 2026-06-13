import styles from './PhonesPage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const PhonesPage = () => {
  const images = [
    'img/banner.png',
    'img/banner-phones.png',
    'img/banner-accessories.png',
  ];

  return (
    <main className={styles.main}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>

      <div className={styles.content}>
        <section className={`${styles.section} ${styles.hero}`}>
          <div className={styles.sliderContainer}>
            <button className={styles.prevBtn}>
              <img src="img/icons/arrow-left.png" alt="Arrow Left" />
            </button>

            <Swiper
              className={styles.swiper}
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                prevEl: `.${styles.prevBtn}`,
                nextEl: `.${styles.nextBtn}`,
              }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {images.map((img, index) => (
                <SwiperSlide key={img} className={styles.slide}>
                  <img
                    key={img}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className={styles.image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button className={styles.nextBtn} aria-label="Next slide">
              <img src="img/icons/arrow-right.png" alt="Arrow Right" />
            </button>
          </div>

          <div
            className={styles.swiperPagination}
            aria-label="Previous slide"
          />
        </section>
      </div>
    </main>
  );
};
