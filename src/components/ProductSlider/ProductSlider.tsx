/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useRef } from 'react';
import Slider from 'react-slick';
import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './ProductSlider.scss';

type Props = {
  filteredSuggestedProducts: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({
  filteredSuggestedProducts,
  title,
}) => {
  const settings = {
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const ref = useRef<Slider>(null);

  const handleNextSlide = () => {
    ref.current?.slickNext();
  };

  const handlePrevSlide = () => {
    ref.current?.slickPrev();
  };

  return (
    <div className="productSlider">
      <div className="productSlider__top">
        <h2 className="text--h1">{title}</h2>
        <div className="productSlider__action">
          <button
            onClick={handlePrevSlide}
            className="button-arrow"
            type="button"
          >
            <span className="icon icon--arrow icon--back" />
          </button>
          <button
            onClick={handleNextSlide}
            className="button-arrow"
            type="button"
          >
            <span className="icon icon--arrow icon--next" />
          </button>
        </div>
      </div>

      <div className="productSlider__phoneList">
        <Slider ref={ref} {...settings}>
          {filteredSuggestedProducts.map((f) => (
            <ProductItem
              key={f.id}
              product={f}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
