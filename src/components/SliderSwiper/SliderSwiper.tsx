import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/scss';
import './sliderSwiper.scss';
import { Products } from '../../types/Products';
import { ProductCard } from '../ProductCard/ProductCard';
import { SwiperButtons } from './SwiperButtons/SwiperButtons';

type SliderProps = {
  productsData: Products[],
  title: string,
};

export const SliderSwiper: React.FC<SliderProps> = ({
  productsData,
  title,
}) => {
  return (
    <>
      <Swiper
        spaceBetween={16}
        slidesPerView={4}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          886: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1176: {
            slidesPerView: 4,
          },
        }}
        modules={[Navigation, Scrollbar]}
        scrollbar={{ draggable: true }}
        navigation={{
          nextEl: 'sliderSwiper__btn',
          prevEl: 'sliderSwiper__btn',
        }}
        className="sliderSwiper"
      >
        <div className="sliderSwiper__titleContainer">
          <h1 className="sliderSwiper__title">{title}</h1>
          <SwiperButtons />
        </div>

        {productsData.map(product => (
          <SwiperSlide key={product.itemId}>
            <ProductCard
              productData={product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
