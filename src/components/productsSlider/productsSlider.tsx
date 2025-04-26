/* eslint-disable max-len */
import './productsSlider.scss';
import { useEffect, useState, useRef } from 'react';
import leftSliderDefault from '../../images/left-slider-default.png';
import leftSliderDisabled from '../../images/left-slider-disabled.png';
import rightSliderDefault from '../../images/right-slider-default.png';
import rightSliderDisabled from '../../images/right-slider-disabled.png';
import { ProductListItem } from '../../types/product';
import { ProductCard } from '../productCard';

interface ProductsSliderProps {
  products: ProductListItem[];
  title: string;
}

export const ProductsSlider = ({ products, title }: ProductsSliderProps) => {
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isFullPrice, setIsFullPrice] = useState(false);

  useEffect(() => {
    if (title === 'Hot prices') {
      setIsFullPrice(true);
    }
  }, [title]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = carouselRef.current;

    const handleScroll = () => {
      if (container) {
        setIsLeftDisabled(container.scrollLeft === 0);
        setIsRightDisabled(
          container.scrollLeft + container.clientWidth >= container.scrollWidth,
        );
      }
    };

    container?.addEventListener('scroll', handleScroll);

    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="productsSlider">
      <div className="productsSlider__header">
        <h2 className="h2">{title}</h2>
        <div className="productsSlider__sliders">
          <button
            className={`productsSlider__sliders--button ${
              isLeftDisabled ? 'disabled' : 'default'
            }`}
            onClick={scrollLeft}
            disabled={isLeftDisabled}
          >
            <img
              src={isLeftDisabled ? leftSliderDisabled : leftSliderDefault}
              alt="LeftDisable"
              className="productsSlider__sliders--img"
            />
          </button>
          <button
            className={`productsSlider__sliders--button ${
              isRightDisabled ? 'disabled' : 'default'
            }`}
            onClick={scrollRight}
            disabled={isRightDisabled}
          >
            <img
              src={isRightDisabled ? rightSliderDisabled : rightSliderDefault}
              alt="RightDefault"
              className="productsSlider__sliders--img"
            />
          </button>
        </div>
      </div>
      <div className="productsSlider__card" ref={carouselRef}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFullPrice={isFullPrice}
          />
        ))}
      </div>
    </div>
  );
};
