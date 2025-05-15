import './SliderHotPrices.scss';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ProductCard } from '../ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { selectAllProducts, fetchProducts } from '../../features/products';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SliderHotPrices: React.FC = () => {
  //const sliderRef = useRef<Slider>(null);
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectAllProducts);
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   arrows: false,
  // };

  
  const sortedProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 10); 
  }, [products]);

  
  const hotPricesSlides = sortedProducts.map(product => (
    <div key={product.id}>
      <ProductCard {...product} />
    </div>
  ));

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;

  const previousOne = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextOne = () => {
    if (currentIndex + visibleCount < hotPricesSlides.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section>
      <div className="carousel">
        <div className="slider__heading">
          <h2 className="text_above_slider">Hot prices</h2>
          <div className="arrows">
            <button
              className="arrow arrowPrev"
              onClick={previousOne}
            >
              <IoIosArrowBack />
            </button>
            <button
              className="arrow arrowNext"
              onClick={nextOne}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        <div
          className="slides-row"
          style={{
            transform: `translateX(-${currentIndex * 322}px)`,
          }}
        >
          
          {hotPricesSlides}
        </div>
      </div>
    </section>
  );
};

export default SliderHotPrices;
