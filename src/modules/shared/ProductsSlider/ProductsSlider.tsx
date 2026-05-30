import s from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../../utils/types/Product';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const uniqueId = title.toLowerCase().replaceAll(' ', '-');

  return (
    <div className={s.productSliderWrapper}>
      <div className={s.topSection}>
        <h3 className={s.title}>{title}</h3>

        <div className={s.topButtonsWrapper}>
          <button
            type="button"
            className={`${s.prev} ${uniqueId}-prev`}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${s.next} ${uniqueId}-next`}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>

      <div className={s.sliderWrapper}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          speed={600}
          navigation={{
            prevEl: `.${uniqueId}-prev`,
            nextEl: `.${uniqueId}-next`,
          }}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.5 },
            1200: { slidesPerView: 4 },
          }}
          className={s.productsSlider}
        >
          {products.map(product => (
            <SwiperSlide className={s.slide} key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
