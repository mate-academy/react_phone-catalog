import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/ProductTypes';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../ProductSlider/ProductSliderStyles.module.scss';

type Props = {
  products: Product[];
  name: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, name }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.products_slider}>
      <div className={styles.brandNew_text}>
        <h2>{name}</h2>
        <div className={styles.buttons}>
          <button ref={prevRef} className={styles.customPrev}>
            &lt;
          </button>
          <button ref={nextRef} className={styles.customNext}>
            &gt;
          </button>
        </div>
      </div>
      <Swiper
        onInit={swiper => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        slidesPerView={2}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        spaceBetween={165}
        modules={[Navigation]}
        className="slider"
      >
        {products.map(product => (
          <SwiperSlide key={product.itemId}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
