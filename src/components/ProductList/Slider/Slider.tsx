import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../ProductCards/ProductCard';

type Props = {
  products: Product[];
  initialRef: React.RefObject<SwiperRef>;
  isHotPrice: boolean;
};

export const Slider: React.FC<Props> = ({
  products,
  initialRef,
  isHotPrice,
}) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 3 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        ref={initialRef}
        spaceBetween={16}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} isHotPrice={isHotPrice} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
