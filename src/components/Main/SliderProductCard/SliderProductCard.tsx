import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderProductCard.scss';

import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../../types/Product';
import { useEffect, useRef, useState } from 'react';

interface ProductSliderProps {
  products: Product[];
  showFullPrice: boolean;
  sliderTitle: string;
}

const NextArrow: React.FC<CustomArrowProps> = ({ className, onClick }) => {
  return <div className={`product-arrow__next product-arrow ${className}`} onClick={onClick} />;
};

const PrevArrow: React.FC<CustomArrowProps> = ({ className, onClick }) => {
  return <div className={`product-arrow__prev product-arrow ${className}`} onClick={onClick} />;
};

export const SliderProductCard: React.FC<ProductSliderProps> = ({
  products,
  sliderTitle,
  showFullPrice,
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [arrowSpacing, setArrowSpacing] = useState(20);

  useEffect(() => {
    const updateArrowSpacing = () => {
      if (
        sliderRef.current &&
        sliderRef.current.innerSlider &&
        sliderRef.current.innerSlider.list
      ) {
        const sliderWidth = sliderRef.current.innerSlider.list.offsetWidth;
        const newSpacing = Math.max((sliderWidth - 100) / 2, 20);

        setArrowSpacing(newSpacing);
      }
    };

    window.addEventListener('resize', updateArrowSpacing);
    updateArrowSpacing();

    return () => window.removeEventListener('resize', updateArrowSpacing);
  }, []);

  const settings = {
    className: 'product-slider',
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    variableWidth: true,
  };

  return (
    <div className="slider-productcard__container">
      <h2 className="slider-productcard__title">{sliderTitle}</h2>
      <div className="arrows-container">
        <PrevArrow
          className="product-arrow__prev slick-prev"
          onClick={() => sliderRef.current?.slickPrev()}
          style={{ marginRight: arrowSpacing }}
        />
        <NextArrow
          className="product-arrow__next slick-next"
          onClick={() => sliderRef.current?.slickNext()}
          style={{ marginLeft: arrowSpacing }}
        />
      </div>
      <Slider ref={sliderRef} {...settings}>
        {products.map(product => (
          <div key={product.id} className="slider__block">
            <ProductCard product={product} showFullPrice={showFullPrice} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
