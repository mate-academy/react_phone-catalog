import React, { useEffect, useState } from 'react';
import styles from './HotPrices.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Product } from '../../shared/Product';
import { ProductType } from '../../types/ProductType';

export const HotPrices: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isTablet, setIsTablet] = useState<boolean>(window.innerWidth >= 640);
  const [isDesktop, setIsDesktop] = useState<boolean>(
    window.innerWidth >= 1024,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 640);
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('api/products.json');
      const data: ProductType[] = await res.json();

      const filteredProducts = data
        .map(product => ({
          ...product,
          discount: product.fullPrice - product.price,
        }))
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 20);

      setProducts(filteredProducts);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className={styles.new__models}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Hot prices</h2>
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
                <Product product={product} fullPriceActive={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
