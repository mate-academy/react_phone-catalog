// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from 'react-slick';
import React from 'react';
import { ProductData } from '../../../types/ProductData';

interface Props {
  product: ProductData;
}

export const ProductSlider: React.FC<Props> = ({ product }) => {
  const settings = {
    customPaging: function (i: number) {
      return (
        <img
          src={product.images[i]}
          alt={product.name}
          className="slider-dot"
        />
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="product-slider">
      <Slider {...settings}>
        {product.images.map((img, index) => (
          <div key={index} className="product-slider__image-container">
            <img
              src={img}
              alt={product.name}
              className="product-slider__image-container__image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
