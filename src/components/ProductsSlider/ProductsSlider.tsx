/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ProductItem } from '../../types/ProductItem';
import { ProductCard } from '../ProductCard';
import { NextArrow } from './NextArrow';
import { PrevArrow } from './PrevArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProductsLoader1x } from '../ProductsLoader/ProductsLoader1x';
import './productsSlider.scss';

type Props = {
  productsList: ProductItem[];
  title: string;
  sliderSettings: {
    dots: boolean,
    arrows: boolean,
    infinite: boolean,
    speed: number,
    slidesToShow: number,
    slidesToScroll: number,
  };
};

export const ProductsSlider: React.FC<Props> = ({
  productsList,
  title,
  sliderSettings,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (productsList.length > 0) {
      setIsLoaded(true);
    }
  }, [productsList]);

  const content = () => (
    <div className="products-slider__content">
      {productsList && (
        <Slider
          {...sliderSettings}
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          {
            productsList.map((item: ProductItem) => (
              <ProductCard
                key={item.id}
                card={item}
              />
            ))
          }
        </Slider>
      )}
    </div>
  );

  return (
    <div className="products-slider">
      <div className="container">
        <div className="products-slider__nav">
          <h2 className="products-slider__title">
            {title}
          </h2>
        </div>
        {isLoaded
          ? content()
          : <ProductsLoader1x style={{ marginTop: '0px' }} />}
      </div>
    </div>
  );
};
