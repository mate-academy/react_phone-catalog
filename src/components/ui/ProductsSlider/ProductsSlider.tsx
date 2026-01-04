import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';
import { Product } from '../../../types';
import ButtonSlider from '../ButtonSlider/ButtonSlider';
import PreviewProductCard from '../PreviewProductCard/PreviewProductCard';
import './ProductsSlider.scss';

type Props = {
  title: string;
  products: Product[];
};

export default function ProductsSlider({ title, products }: Props) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => swiperInstance?.slidePrev();
  const handleNext = () => swiperInstance?.slideNext();

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__row">
        <h2 className="ProductsSlider__title">{title}</h2>
        <div className="ProductsSlider__btns">
          <ButtonSlider
            type="slider"
            name="arrow-left"
            onClick={handlePrev}
            disabled={isBeginning}
          />
          <ButtonSlider
            type="slider"
            name="arrow-right"
            onClick={handleNext}
            disabled={isEnd}
          />
        </div>
      </div>

      <Swiper
        className="ProductsSlider__swiper"
        onSwiper={swiper => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        slidesPerView={1.5}
        spaceBetween={16}
        observer={true}
        observeParents={true}
        onSlideChange={swiper => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onResize={swiper => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map(product => (
          <SwiperSlide key={`${title}-${product.id}`}>
            <PreviewProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
