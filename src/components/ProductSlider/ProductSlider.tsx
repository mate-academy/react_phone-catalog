import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  title: string;
  product: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, product }) => {
  return (
    <section className="productSlider">
      <div className="productSlider__header">
        <h2>{title}</h2>
        <div className="productSlider__navigation">
          <button className="productSlider__prev" id={'productPrev'}></button>
          <button className="productSlider__next" id={'productNext'}></button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, EffectCreative]}
        slidesPerView={1.4}
        spaceBetween={16}
        navigation={{
          nextEl: '#productNext',
          prevEl: '#productPrev',
        }}
      >
        {product.map((prod, index) => (
          <SwiperSlide key={index}>
            <div className="box">
              <ProductCard prod={prod} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
