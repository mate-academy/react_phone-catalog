import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
// import { Navigation } from 'swiper/modules';
import styles from './ProductSlider.module.scss';

import 'swiper/css';
// import 'swiper/css/navigation';

import { ProductCard } from '../ProductCard/ProductCard';
import { useRef } from 'react';

type Product = {
  id: string;
  title: string;
  price: number;
  image?: string;
  screen: string;
  capacity: string;
  ram: string;
};

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  // console.log(products);

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button type="button" onClick={() => swiperRef.current?.slidePrev()}>
            ←
          </button>

          <button type="button" onClick={() => swiperRef.current?.slideNext()}>
            →
          </button>
        </div>
      </div>

      <Swiper
        // modules={[Navigation]}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        // navigation
        spaceBetween={16}
        // slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1.3 },
          640: { slidesPerView: 2.5 },
          1200: { slidesPerView: 4 },
        }}
      >
        {/* {products.slice(0, 20).map(product => ( */}
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
