import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProductType } from './types/product';
import React from 'react';
import Product from './modules/Devices/componets/Product';

type Props = {
  products: ProductType[] | [];
  isHotPrices?: boolean;
};

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  const isDisabled = className.includes('slick-disabled');

  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        top: '0',
        transform: 'none',
        height: '32px',
        width: '32px',
        borderRadius: '48px',
        border: `1px solid ${isDisabled ? '#E2E6E9' : '#B4BDC3'}`,
      }}
      onClick={onClick}
    >
      <div
        style={{
          color: `${isDisabled ? '#E2E6E9' : '#0F0F11'}`,
          fontSize: '26px',
        }}
      >
        ›
      </div>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  const isDisabled = className.includes('slick-disabled');

  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        height: '32px',
        width: '32px',
        top: '0',
        left: 'auto',
        transform: 'none',
        borderRadius: '48px',
        border: `1px solid ${isDisabled ? '#E2E6E9' : '#B4BDC3'}`,
      }}
      onClick={onClick}
    >
      <span
        style={{
          color: `${isDisabled ? '#E2E6E9' : '#0F0F11'}`,
          fontSize: '26px',
        }}
      >
        ‹
      </span>
    </div>
  );
}

export const ProductsSlider: React.FC<Props> = ({
  products,
  isHotPrices = false,
}) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          variableWidth: true,
          //initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="new-models__slider">
      {products.map(product => (
        <Product key={product.id} product={product} isHotPrices={isHotPrices} />
      ))}
    </Slider>
  );
};

export default ProductsSlider;
