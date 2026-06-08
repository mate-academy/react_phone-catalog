import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Products } from '../../types/Alltypes';
import styles from './BrandNewModels.module.scss';
import React, { useState, useEffect } from 'react';
import { getData } from '../../fetch/httpClient';
import { ProductCarts } from '../ProductCart/ProductCarts';

export const BrandNewModels: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getData<Products[]>('./api/products.json').then(data => {
      setProducts(data);
    });
  }, []);

  const newProducts = [...products].sort((a, b) => b.year - a.year);

  return (
    <div className={styles.containerNewModels}>
      <div className={styles.newModels}>
        <h2>Brand new models</h2>
        <div className={styles.buttonsGroup}>
          <button className={styles.buttonNewModels} id="main-prev-button">
            <img
              src="/img/left.svg"
              alt="left"
              className={styles.newModelsGroup}
            />
          </button>
          <button className={styles.buttonNewModels} id="main-next-button">
            <img
              src="/img/right.svg"
              alt="right"
              className={styles.newModelsImg}
            />
          </button>
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{
            clickable: true,
            // el: '#main-slider-pagination',
          }}
          loop={false}
          className={styles.swiperNewBlock}
          navigation={{
            prevEl: '#main-prev-button',
            nextEl: '#main-next-button',
          }}
        >
          {newProducts.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCarts
                id={product.id}
                title={product.title}
                price={product.price}
                screen={product.screen}
                capacity={product.capacity}
                ram={product.ram}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
