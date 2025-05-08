import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Product } from '../Product';
import { ProductType } from '../../types/ProductType';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: ProductType[];
  fullPriceActive?: boolean;
  sectionClassName?: string;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  fullPriceActive = false,
}) => {
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

  return (
    <section className={styles.productsSlider}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
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
            {products.map(product => (
              <SwiperSlide key={product.id} className={styles.slider__slide}>
                <Product product={product} fullPriceActive={fullPriceActive} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
