import React from 'react';
import Slider from 'react-slick';
import { ProductCard } from '../ProductCard/ProductCard';
import "./ProductsSlider.scss";
const ButtonNext = ({className, onClick}) => {
  return (
    <button className={className} onClick={onClick}>
      <a href="#" className="banner__arrow banner__arrow_next"></a>
    </button>
  )
}

const ButtonPrev = ({className, onClick}) => {
  return (
    <button className={className} onClick={onClick}>
      <a href="#" className="banner__arrow banner__arrow_prev"></a>
    </button>
  )
}
export const ProductSlider = ({ products }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesPerRow: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
            slidesPerRow: 3
        }
      },
      {
        breakpoint: 900,
        settings: {
            slidesPerRow: 2
        }
      },
     {
      breakpoint: 600,
      settings: {
          slidesPerRow: 1
      }
    }
    ],
    nextArrow: <ButtonNext />,
    prevArrow: <ButtonPrev />,
    autoplay: true,
  };
return (
  <div className="slider-sale">
      <Slider {...settings}>
    {products.map(product => (
       <div key={product.id}>
      <ProductCard product={product} />
      </div>
    ))}
  </Slider>
  </div>

)
}