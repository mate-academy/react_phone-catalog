import React from 'react';
import Slider from 'react-slick';
import { DeviceType } from '../../../types/deviceType';

type Props = {
  findedProduct: DeviceType;
};

export const ProductDetailsSlider: React.FC<Props> = ({ findedProduct }) => {
  const settings = {
    customPaging: function (i: number) {
      return (
        <a className="devices__slider-link">
          <img
            src={findedProduct.images[i]}
            className="devices__slider-photo"
          />
        </a>
      );
    },
    dots: true,
    arrows: false,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {findedProduct.images.map((img, index) => (
          <div key={index}>
            <img src={img} className="devices__slider-photo-main" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductDetailsSlider;
