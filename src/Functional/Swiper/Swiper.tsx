import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { ProductCarts } from '../ProductCart/ProductCarts';
import styles from './Swiper.module.scss';
import { Products } from '../../types/Alltypes';
import { useEffect, useState } from 'react';
import { getData } from '../../fetch/httpClient';

export const useSwiper: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getData<Products[]>('./api/products.json')
      .then(data => {
        const product = data.find(item => item.id === productId);
        console.log('Product:', product); // <-- додай це
        setProducts(product || null);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const withDiscount = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
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
  );
};
