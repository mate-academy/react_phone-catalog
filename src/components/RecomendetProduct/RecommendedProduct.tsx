import React, { useEffect, useState } from 'react';
import styles from './RecommendedProduct.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Product } from '../../shared/Product';
import { ProductType } from '../../types/ProductType';
type Props = {
  products: ProductType[];
};

export const RecommendedProduct: React.FC<Props> = ({ products }) => {
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 640);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 640);
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProducts = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 20);

  return (
    <section className={styles.recommended}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>You may also like</h2>
          <div className={styles.slider__controls}>
            <button className={styles.slider__controlsPrev}>
              <span />
            </button>
            <button className={styles.slider__controlsNext}>
              <span />
            </button>
          </div>
        </div>

        <div className={styles.slider}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={isDesktop ? 4 : isTablet ? 2 : 1}
            navigation={{
              nextEl: `.${styles.slider__controlsNext}`,
              prevEl: `.${styles.slider__controlsPrev}`,
            }}
            pagination={{
              clickable: true,
              el: `.${styles.slider__pagination}`,
            }}
            spaceBetween={10}
          >
            {filteredProducts.map(product => (
              <SwiperSlide key={product.id} className={styles.slider__slide}>
                <Product product={product} fullPriceActive={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
