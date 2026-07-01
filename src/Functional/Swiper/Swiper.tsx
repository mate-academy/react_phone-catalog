import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { ProductCarts } from '../ProductCart/ProductCarts';
import styles from './Swiper.module.scss';
import { Products } from '../../types/Alltypes';
import { useEffect, useState } from 'react';
import { getData } from '../../fetch/httpClient';

export const UseSwiper: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getData<Products[]>('/api/products.json')
      .then(data => {
        setProducts(data || []);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const withDiscount = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  if (loading) {
    return <div>Loading slider...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={styles.swiperBlock}>
      <div className={styles.buttonsGroup}>
        <button className={styles.buttonHotPrice} id="hot-prev-button">
          <img
            src="/img/left.svg"
            alt="left"
            className={styles.hotPriceGroup}
          />
        </button>
        <button className={styles.buttonHotPrice} id="hot-next-button">
          <img
            src="/img/right.svg"
            alt="right"
            className={styles.hotPriceImg}
          />
        </button>
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
            320: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            1200: { slidesPerView: 4, spaceBetween: 16 },
          }}
          loop={false}
          className={styles.swiperNewBlock}
          navigation={{
            prevEl: '#hot-prev-button',
            nextEl: '#hot-next-button',
          }}
        >
          {withDiscount.length > 0 &&
            withDiscount.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCarts product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};
