import React, { useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './BrandList.module.scss'; // Імпорт модуля SCSS
import productsData from '../../../../public/api/products.json';  // Імпортуємо продукти з JSON
import '../../../mainStyles.scss';
import { ProductCard } from '../ProductCard/ProductCard'; // Імпортуємо ProductCard

export const BrandList: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const filteredProducts = productsData.filter((product) => product.year === 2022);
  
  const cards = filteredProducts;

  const handleSlideChange = (newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  return (
    <div className={`${styles.brand_list} swiper-container`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Brand new models</h2>
          <div className={styles.buttons}>
            <button
              className={`${styles.buttonPrev} ${currentSlide === 0 ? styles.disabled : ''}`}
              onClick={() => setCurrentSlide(currentSlide === 0 ? cards.length - 1 : currentSlide - 1)}
              disabled={currentSlide === 0}
            >
              &#8249; 
            </button>
            <button
              className={`${styles.buttonNext} ${currentSlide === cards.length - 1 ? styles.disabled : ''}`}
              onClick={() => setCurrentSlide(currentSlide === cards.length - 1 ? 0 : currentSlide + 1)}
              disabled={currentSlide >= cards.length - 1}
            >
              &#8250; {/* Права стрілка */}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <Swiper
          onSlideChange={({ activeIndex }) => handleSlideChange(activeIndex)}
          grabCursor={true}
          spaceBetween={16}  // Відступ між слайдами
          slidesPerView="auto"  // Один слайд за раз
          watchOverflow={true}
          speed={1000}
          modules={[Navigation]}
          navigation={{
            nextEl: `.${styles.buttonNext}`,
            prevEl: `.${styles.buttonPrev}`,
            disabledClass: 'swiper-button-disabled',
          }}
        >
          {cards.map((product, index) => (
            // Тепер кожен слайд містить одну картку
            <SwiperSlide key={index} className={styles.slide}>
              <ProductCard
                product={product} // Передаємо один продукт в пропс
                showDiscount={false} // Показуємо знижку
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

