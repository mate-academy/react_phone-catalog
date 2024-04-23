import React, { useState, useRef, useEffect } from 'react';
import './Carousel.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  products: Product[];
};

export const Carousel: React.FC<Props> = ({ title, products }) => {
  const [activeArrowLeft, setActiveArrowLeft] = useState(false);
  const [activeArrowRight, setActiveArrowRight] = useState(true);
  const slider = useRef<HTMLUListElement>(null);
  const [sliderItemWidth, setSliderItemWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 640 && windowWidth <= 1199) {
        setSliderItemWidth(237);
      } else if (windowWidth >= 320 && windowWidth < 640) {
        setSliderItemWidth(220);
      } else {
        setSliderItemWidth(272);
      }

      if (slider.current) {
        slider.current.scrollTo(0, 0);
        setActiveArrowLeft(false);
        setActiveArrowRight(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goLeft = () => {
    if (slider.current) {
      setActiveArrowRight(true);
      const currentScroll = slider.current.scrollLeft;

      slider.current.scrollTo(currentScroll - sliderItemWidth - 16, 0);
      if (currentScroll - sliderItemWidth <= 0) {
        setActiveArrowLeft(false);
      }
    }
  };

  const goRight = () => {
    if (slider.current) {
      const currentScroll = slider.current.scrollLeft;
      const maxScroll = slider.current.scrollWidth - slider.current.offsetWidth;

      slider.current.scrollTo(currentScroll + sliderItemWidth + 16, 0);
      setActiveArrowLeft(true);
      if (currentScroll + sliderItemWidth >= maxScroll) {
        setActiveArrowRight(false);
      }
    }
  };

  return (
    <div className="carousel">
      <div className="carousel__top">
        <h2 className="carousel__title">{title}</h2>

        <div className="carousel__nav">
          <button
            className="carousel__button carousel__button--left"
            type="button"
            onClick={goLeft}
            disabled={!activeArrowLeft}
            aria-label="slider move left"
          />

          <button
            className="carousel__button carousel__button--right"
            type="button"
            onClick={goRight}
            disabled={!activeArrowRight}
            aria-label="slider move right"
          />
        </div>
      </div>
      <ul className="carousel__cards" ref={slider}>
        <ProductCard slicedProducts={products.slice(0, 20)} />
      </ul>
    </div>
  );
};
