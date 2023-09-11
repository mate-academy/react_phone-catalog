import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';

import './ProductSlider.scss';

import { Product } from '../../../types/Product';
import { ProductTitles } from '../../../types/ProductTitles';
import { ProductCard } from '../../../components/ProductCard';

type Props = {
  title: ProductTitles,
  products: Product[]
};

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
}) => {
  const visibleProducts = products.slice(0, 21);

  const navigationMode = true;

  return (
    <div className="slider container">
      <div className="slider__header">
        <h1 className="container--title">
          {title}
        </h1>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={16}
        navigation={navigationMode}
        modules={[Navigation]}
        className="mySwiper"
      >
        {visibleProducts.map(currentProduct => (
          <SwiperSlide
            className="slider-item"
            key={currentProduct.id}
          >
            <ProductCard
              title={title}
              product={currentProduct}
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};
