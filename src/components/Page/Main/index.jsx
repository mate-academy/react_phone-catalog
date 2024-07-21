import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'; // імпортуємо модулі
import { Swiper, SwiperSlide } from 'swiper/react';
import { Category } from '../../components/Category';
import { Section } from '../../components/Section';
import slidesData from './img/slidesData.json';
import styles from './Main.module.scss';

export default function Main({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goToSlide = slideIndex => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(slideIndex);
    }
  };

  return (
    <main className={styles.root}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <section className={styles.mainBanner}>
        <div className={styles.carousel}>
          <div className={styles.leftArrow} onClick={slidePrev}>
            <FaChevronLeft size={16} />
          </div>

          <Swiper
            ref={swiperRef}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }} // додаємо autoplay
            onSlideChange={swiper => setCurrentIndex(swiper.realIndex)}
            className={styles.swiperContainer}
            modules={[Autoplay, Navigation, Pagination]} // підключаємо модулі
          >
            {slidesData.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className={styles.slideContent}>
                  <img src={slide.images} alt={`Slide ${slide.id}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.rightArrow} onClick={slideNext}>
            <FaChevronRight size={16} />
          </div>
        </div>
        <div className={styles.dotsContainer}>
          {slidesData.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </section>
      <section className={styles.sectionContainer}>
        <Section sort="new" title="Brand new models" />
        <Category title="Shop by category" products={products} />
        <Section sort="bigPrice" title="Hot prices" />
      </section>
    </main>
  );
}
