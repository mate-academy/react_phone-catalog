import React from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';


import { SimpleSlider } from '../../components/Slider';
import { ProductCard } from '../../components/ProductCard';
import { Categories } from '../../components/Categories';

import './HomePage.scss';

export const HomePage: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: 'linear',
    slidesToShow: 4,
    arrows: true,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 876,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <SimpleSlider />
      <section className="hot-prices">
        <h2 className="title">Hot prices</h2>
        <div className="hot-price-products">
          <Slider {...settings}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Slider>
        </div>
      </section>
      <section className="categories">
        <h2 className="title">Shop by category</h2>
        <Categories />
      </section>

      <section className="new-models">
        <h2 className="title">Brand new models</h2>
        <div className="new-models-products">
          <Slider {...settings}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Slider>
        </div>
      </section>
    </>
  );
};
