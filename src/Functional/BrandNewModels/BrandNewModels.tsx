import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Products } from '../../types/Alltypes';
import styles from './BrandNewModels.module.scss';
import React, { useState, useEffect } from 'react';
import { getData } from '../../fetch/httpClient';
import { ProductCarts } from '../ProductCart/ProductCarts';

export const BrandNewModels: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getData<Products[]>('./api/products.json')
      .then(data => setProducts(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading slider...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const newProducts = [...products].sort((a, b) => b.year - a.year);

  return (
    <div className={styles.containerNewModels}>
      <div className={styles.newModels}>
        <h2>Brand new models</h2>
        <div className={styles.buttonsGroup}>
          <button className={styles.buttonNewModels} id="brand-prev-button">
            <img
              src="./img/left.svg"
              alt="left"
              className={styles.newModelsGroup}
            />
          </button>
          <button className={styles.buttonNewModels} id="brand-next-button">
            <img
              src="./img/right.svg"
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
          slidesPerView={4}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            1200: { slidesPerView: 4, spaceBetween: 16 },
          }}
          loop={false}
          className={styles.swiperNewBlock}
          navigation={{
            prevEl: '#brand-prev-button',
            nextEl: '#brand-next-button',
          }}
        >
          {newProducts.length > 0 &&
            newProducts.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCarts product={product} isNew={true} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
