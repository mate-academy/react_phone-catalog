import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { ProductDetailed } from '../../types/ProductDetailed';
import { useLoading } from '../../context/LoadingContext';
import { Loader } from '../Loader';
import 'swiper/css';
import './BrandModelsSlider.scss';

type Props = {
  title: string;
  products: Product[] | ProductDetailed[];
};

export const BrandModelsSlider: React.FC<Props> = ({ title, products }) => {
  const { isLoading } = useLoading();
  const sliderId = title.toLowerCase().replace(/\s+/g, '-');

  if (products.length === 0) return <p>No products found</p>;
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

      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          className="slider-container"
          modules={[Navigation]}
          navigation={{
            prevEl: `.swiper-button--prev-${sliderId}`,
            nextEl: `.swiper-button--next-${sliderId}`,
          }}
          spaceBetween={16}
          speed={500}
          slidesPerView={'auto'}
          slidesPerGroup={2}
        >
          {products.map(product => (
            <SwiperSlide key={product.id} className="slider-item">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
