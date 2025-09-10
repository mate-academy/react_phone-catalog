import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ProductCard } from '../../../elements/ProductCard/ProductCard';
import '../NewModels/NewModels';

export default function HotPrice({ products }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="swiper-wrapper-custom relative">
      <div className="swiper-button">
        <p className="swiper-wrapper-title">Hot prices</p>
        <div className="swiper-button-box">
          <button
            ref={prevRef}
            className={`swiper-button-custom left ${
              isBeginning ? 'disabled' : ''
            }`}
          >
            <img
              src="./images/icons/Chevron_Arrow_Left${
                isBeginning ? '_Disabled' : ''
              }.svg"
              className="icons_arrow"
              alt="Chevron Left"
            />
          </button>

          <button
            ref={nextRef}
            className={`swiper-button-custom right ${isEnd ? 'disabled' : ''}`}
          >
            <img
              src="./images/icons/Chevron_Arrow_Right${
                isEnd ? '_Disabled' : ''
              }.svg"
              className="icons_arrow"
              alt="Chevron Right"
            />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={swiper => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={swiper => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={swiper => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          0: { slidesPerView: 'auto', spaceBetween: 16 },
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <div className="new-models-hot-price">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
