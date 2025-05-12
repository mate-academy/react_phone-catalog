import './SliderHotPrices.scss';
import React, { useRef, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ProductCard } from '../ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { selectAllProducts, fetchProducts } from '../../features/products';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SliderHotPrices: React.FC = () => {
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
  const sortedProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 10); // optional: show only top 10
  }, [products]);

  // ✅ Prepare slides outside JSX
  const productSlides = sortedProducts.map(product => (
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
    <section>
      <div className="slick-container">
        <div className="slider__heading">
          <h2 className="text_above_slider">Hot prices</h2>
          <div className="arrows">
            <button
              className="arrow arrowPrev"
              onClick={() => handleArrowClick('prev')}
            >
              <IoIosArrowBack />
            </button>
            <button
              className="arrow arrowNext"
              onClick={() => handleArrowClick('next')}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {productSlides}
        </Slider>
      </div>
    </section>
  );
};

export default SliderHotPrices;
