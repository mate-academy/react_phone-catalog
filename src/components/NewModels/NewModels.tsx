import React, { useEffect, useState } from 'react';
import styles from './NewModels.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Product } from '../../shared/Product';
import { ProductType } from '../../types/ProductType';

export const NewModels: React.FC = () => {
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('api/products.json');
        const data: ProductType[] = await res.json();

        const filteredProducts = data
          .filter(product => product.category === 'phones')
          .reverse();

        setProducts(filteredProducts);
      } catch (error) {
        throw new Error('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className={styles.new__models}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Brand new models</h1>
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
                <Product product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
