import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import './ProductsSlider.scss';
import { Product, ProductDetailed } from '../../../../types/types';
import { ProductCard } from '../ProductCard';
import { Loader } from '../Loader';
import { useLoading } from '../../../../context/LoadingContext';

type Props = {
  title: string;
  goods: Product[] | ProductDetailed[];
};

export const ProductsSlider: React.FC<Props> = ({ title, goods }) => {
  const { isLoading } = useLoading();
  const sliderId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="slider-wrapper">
      <div className="slider-header">
        <h2 className="slider-title">{title}</h2>

        <div className="slider-controls">
          <button
            className={`swiper-button swiper-button--prev swiper-button--prev-${sliderId}`}
            aria-label="Previous slide"
          ></button>
          <button
            className={`swiper-button swiper-button--next swiper-button--next-${sliderId}`}
            aria-label="Next slide"
          ></button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.swiper-button--prev-${sliderId}`,
          nextEl: `.swiper-button--next-${sliderId}`,
        }}
        spaceBetween={16}
        slidesPerView={'auto'}
        slidesPerGroup={2}
        speed={500}
        className="slider-container"
      >
        {isLoading ? (
          <Loader />
        ) : (
          goods &&
          goods.length > 0 &&
          goods.map(good => (
            <SwiperSlide key={good.id} className="slider-item">
              <ProductCard product={good} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};
