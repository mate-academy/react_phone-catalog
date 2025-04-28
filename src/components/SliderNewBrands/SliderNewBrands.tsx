import './SliderNewBrands.scss';
import React, { useRef, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ProductCard } from '../ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { selectAllProducts, fetchProducts } from '../../features/products';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SliderNewBrands: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectAllProducts);
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  // ✅ Sort and slice (e.g. top 10 with biggest discounts)
  const sortedNewBrands = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year).slice(0, 10); // optional: show only top 10
  }, [products]);

  // ✅ Prepare slides outside JSX
  const newBrandsSlides = sortedNewBrands.map(product => (
    <div key={product.id}>
      <ProductCard {...product} />
    </div>
  ));

  const handleArrowClick = (direction: 'next' | 'prev') => {
    if (!sliderRef.current) {
      return;
    }

    direction === 'next'
      ? sliderRef.current.slickNext()
      : sliderRef.current.slickPrev();
  };

  return (
    <div className="slick-container">
      <div className="slider__heading">
        <h2>Brand new models</h2>
        <div className="arrows">
          <button
            className="arrowPrev"
            onClick={() => handleArrowClick('prev')}
          >
            <IoIosArrowBack />
          </button>
          <button
            className="arrowNext"
            onClick={() => handleArrowClick('next')}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {newBrandsSlides}
      </Slider>
    </div>
  );
};

export default SliderNewBrands;
