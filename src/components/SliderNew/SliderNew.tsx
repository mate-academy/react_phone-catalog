import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';

import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getHotPriceProducts } from '../../utils/getHotPriceProducts';
import { ProductCard } from '../ProductCard';

const navigationMode = true;

export const SliderNew = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts()
      .then(setHotPriceProducts);
  }, []);

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={16}
      effect="fade"
      navigation={navigationMode}
      modules={[EffectFade, Navigation]}
      className="mySwiper"
    >
      {hotPriceProducts.map(product => (
        <SwiperSlide key={product.id}>
          <ProductCard key={product.id} product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
