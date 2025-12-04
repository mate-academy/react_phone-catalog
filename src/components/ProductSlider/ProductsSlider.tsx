import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Product } from '../../types/Producst';
import 'swiper/css';
import 'swiper/css/navigation';
import s from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[] | undefined;
  isFullPrice?: boolean;
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  isFullPrice,
  title,
}) => {
  return (
    <div className={s['product-slider']}>
      <div className={s['product-slider__header']}>
        <h2 className={s['product-slider__title']}>{title}</h2>

        <div className={s['product-slider__navigation']}>
          <button className={s['product-slider__prev']}>
            <img src="/img/icons/Arrow_left.png" alt="" />
          </button>
          <button className={s['product-slider__next']}>
            <img src="/img/icons/Arrow_right.png" alt="" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={16}
        navigation={{
          prevEl: `.${s['product-slider__prev']}`,
          nextEl: `.${s['product-slider__next']}`,
        }}
      >
        {products?.map(product => {
          return (
            <SwiperSlide key={product.id} style={{ width: '272px' }}>
              <ProductCard product={product} isFullPrice={isFullPrice} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
