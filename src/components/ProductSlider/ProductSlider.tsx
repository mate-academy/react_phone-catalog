import React, { useRef, useState } from 'react';
import styles from './ProductSlider.module.scss';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

// Імпорт основних стилів Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

interface ProductSliderProps {
  title: string;
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ title, products }) => {
  // Створюємо useRef для доступу до екземпляра Swiper
  const swiperRef = useRef<SwiperRef | null>(null);

  // Створюємо стан для відстеження позиції
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Функція-обробник для Swiper
  const handleSlideChange = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className={styles.sliderContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.navigation}>
          {/* Навігація - використовуємо методи Swiper */}
          <button
            className={`${styles.navButton} ${styles.prevButton} ${isBeginning ? styles.disabled : ''}`}
            aria-label="Previous"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            disabled={isBeginning}
          >
            <img
              className={styles.navButtonImg}
              src={
                isBeginning
                  ? 'src/images/icons/arrow-left-gray.svg'
                  : 'src/images/icons/arrow-left-black.svg'
              }
              alt="arrow left"
            />
          </button>
          <button
            className={`${styles.navButton} ${styles.nextButton} ${isEnd ? styles.disabled : ''}`}
            aria-label="Next"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            disabled={isEnd}
          >
            <img
              className={styles.navButtonImg}
              src={
                isEnd
                  ? 'src/images/icons/arrow-right-gray.svg'
                  : 'src/images/icons/arrow-right-black.svg'
              }
              alt="arrow right"
            />
          </button>
        </div>
      </div>

      {/* Головний компонент Swiper */}
      <Swiper
        ref={swiperRef} // Прив'язка useRef
        modules={[Navigation]} // Підключення модуля навігації
        spaceBetween={16} // Відстань між картками
        slidesPerView={1.5} // Скільки слайдів показувати (менше 1.2, щоб був видимий наступний)
        className={styles.swiperWrapper} // Клас для кастомізації контейнера
        onSlideChange={handleSlideChange}
        // onInit={handleSlideChange}
        // Налаштування адаптивності для відображення 4 карток, як на макеті
        breakpoints={{
          // коли ширина вікна >= 768px
          640: {
            slidesPerView: 2.46,
            spaceBetween: 16,
          },
          // коли ширина вікна >= 1024px
          1024: {
            slidesPerView: 3.6,
            spaceBetween: 16,
          },
          // коли ширина вікна >= 1200px
          1200: {
            slidesPerView: 4,
            spaceBetween: 16,
            // Якщо потрібна повна видимість без "обрізання"
            // slidesPerView: 'auto',
            // freeMode: true,
          },
        }}
      >
        {/* Мапуємо дані в SwiperSlide */}
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles.swiperSlide}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductSlider;
