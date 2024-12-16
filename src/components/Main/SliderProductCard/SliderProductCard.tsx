import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderProductCard.scss';

import { ProductCard } from '../ProductCard/ProductCard';
import { useRef } from 'react';
import { useArrowSpacing, useShuffledProducts } from '../../../hooks/HooksSlider';
import { ProductSliderProps } from '../../../types/TSlider';

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
  const arrowSpacing = useArrowSpacing(sliderRef);
  const [shuffledProducts] = useShuffledProducts(products);

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
        {shuffledProducts.map(product => (
          <div key={product.id} className="slider__block">
            <ProductCard product={product} showFullPrice={showFullPrice} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
