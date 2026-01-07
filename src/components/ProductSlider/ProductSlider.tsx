import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

// Імпорт основних стилів Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { ArrowIcon } from '../icons';

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
  const updateNavigationState = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div>
      <section className={styles.sliderContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.navigation}>
            {/* Навігація - використовуємо методи Swiper */}
            <button
              // className={`${styles.navButton} ${styles.prevButton} ${isBeginning ? styles.disabled : ''}`}
              className={`${styles.navButton} ${isBeginning ? styles.disabled : ''}`}
              aria-label="Previous"
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              disabled={isBeginning}
            >
              <ArrowIcon direction="left" />
            </button>

            <button
              // className={`${styles.navButton} ${styles.nextButton} ${isEnd ? styles.disabled : ''}`}
              className={`${styles.navButton} ${isEnd ? styles.disabled : ''}`}
              aria-label="Next"
              onClick={() => swiperRef.current?.swiper.slideNext()}
              disabled={isEnd}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* Головний компонент Swiper */}
        <div className={styles.swiperOuter}>
          <Swiper
            ref={swiperRef} // Прив'язка useRef
            modules={[Navigation]} // Підключення модуля навігації
            spaceBetween={16} // Відстань між картками
            slidesPerView={1.5} // Скільки слайдів показувати (менше 1.5, щоб був видимий наступний)
            className={styles.swiperWrapper} // Клас для кастомізації контейнера
            // onSlideChange={handleSlideChange}

            // Оновлюємо стан при ініціалізації
            onSwiper={swiper => updateNavigationState(swiper)}
            // Оновлюємо стан при будь-якій зміні слайдів
            onSlideChange={swiper => updateNavigationState(swiper)}
            // Додатковий захист для дробових slidesPerView
            onReachEnd={swiper => updateNavigationState(swiper)}
            onReachBeginning={swiper => updateNavigationState(swiper)}
            // Налаштування адаптивності
            breakpoints={{
              // коли ширина вікна >= 640px
              640: {
                slidesPerView: 2.46,
                spaceBetween: 16,
              },
              800: {
                slidesPerView: 2.8,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3.6,
                spaceBetween: 16,
              },
              1200: {
                // slidesPerView: 4,
                slidesPerView: 4,
                spaceBetween: 16,
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
        </div>
      </section>
    </div>
  );
};

export default ProductSlider;
