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
  navigationIds: {
    prevId: string;
    nextId: string;
  };
  showDiscount: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  title,
  product,
  navigationIds,
  showDiscount,
}) => {
  const { prevId, nextId } = navigationIds;

  return (
    <section className="productSlider">
      <div className="productSlider__header">
        <h2 className="productSlider__title">{title}</h2>
        <div className="productSlider__navigation">
          <button className="productSlider__prev" id={prevId}></button>
          <button className="productSlider__next" id={nextId}></button>
        </div>
      </div>
      <div className="productSlider__swiper">
        <Swiper
          modules={[Navigation, EffectCreative]}
          slidesPerView={1.4}
          spaceBetween={16}
          navigation={{
            nextEl: `#${nextId}`,
            prevEl: `#${prevId}`,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.4,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {product.map((prod, index) => (
            <SwiperSlide key={index}>
              <div className="productSlider__box">
                <ProductCard prod={prod} showDiscount={showDiscount} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
