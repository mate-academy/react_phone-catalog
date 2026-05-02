import '../../MainHome/ProductSlider/ProductSlider.scss';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Product } from '../../../types/Product';
import ProductCard from '../../ProductList/ProductCard/ProductCard';

type ProductSliderMainProps = {
  title: string;
  MayLikeProducts: Product[];
};

const ProductSliderMain = ({
  title,
  MayLikeProducts,
}: ProductSliderMainProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="product-slider">
      <div className="product-slider__header">
        <h2 className="product-slider__title">{title}</h2>
        <div className="product-slider__nav">
          <button ref={prevRef} className="product-slider__nav-btn">
            &#8249;
          </button>
          <button ref={nextRef} className="product-slider__nav-btn">
            &#8250;
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2 },
          1200: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={swiper => {
          const navigation = swiper.params.navigation;

          if (navigation && typeof navigation === 'object') {
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        modules={[Navigation]}
        className="product-slider__swiper"
      >
        {MayLikeProducts.map(product => (
          <SwiperSlide key={product.itemId} className="product-slider__slide">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSliderMain;
