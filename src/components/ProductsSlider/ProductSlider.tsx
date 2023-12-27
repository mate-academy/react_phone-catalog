/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import 'swiper/css';
import { Navigation } from 'swiper';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.scss';
import { Product } from '../../helpers/types/Product';

const ProductsSlider = ({
  productData, title, sliderId,
}:
{
  productData: Product[],
  title: React.ReactNode,
  sliderId: string;
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex);
  };

  return (
    <div data-cy="cardsContainer" className="slider">
      <div className="slider_titlewithbuttons">
        <h1 className="slider_titlewithbuttons_title">{title}</h1>
        <div className="slider_buttons">
          <button
            type="button"
            className={`slider_buttons_left ${currentSlide === 0 ? 'disabled' : ''} ${sliderId}-left`}
            aria-label="Previous"
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide(currentSlide - 1)}
          />

          <button
            type="button"
            className={`slider_buttons_right ${currentSlide === 7 ? 'disabled' : ''} ${sliderId}-right`}
            aria-label="Next"
            disabled={currentSlide === productData.length - 1}
            onClick={() => setCurrentSlide(currentSlide + 1)}
          />
        </div>
      </div>

      <Swiper
        className="slider_products"
        spaceBetween={16}
        navigation={{
          nextEl: `.${sliderId}-right`,
          prevEl: `.${sliderId}-left`,
        }}
        breakpoints={{
          272: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          848: {
            slidesPerView: 3,
          },
          1170: {
            slidesPerView: 4,
          },
        }}
        modules={[Navigation]}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
      >
        {productData.map(product => (
          <SwiperSlide key={uuidv4()}>
            <ProductCard product={product} key={product.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
