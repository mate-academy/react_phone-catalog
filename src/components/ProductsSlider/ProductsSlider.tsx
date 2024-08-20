import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';
import { RoundButton } from '../RoundButton';
import { useState } from 'react';
import { Product } from '../../types/Product';

interface ProductsSliderProps {
  products: Product[];
  title: string;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  title,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideWidth = 288;

  const nextSlide = () => {
    setSlideIndex(prevSlideIndex => {
      const totalSlides = products.length;

      if (prevSlideIndex < totalSlides - 1) {
        return prevSlideIndex + 1;
      } else {
        return prevSlideIndex;
      }
    });
  };

  const previousSlide = () => {
    setSlideIndex(prevSlideIndex => {
      if (prevSlideIndex > 0) {
        return prevSlideIndex - 1;
      } else {
        return prevSlideIndex;
      }
    });
  };

  const containerStyles = {
    transform: `translateX(-${slideIndex * slideWidth}px)`,
  };

  return (
    <div className="products-slider products-slider--margin-top">
      <div className="products-slider__navigate">
        <h2 className="page__subtitle">{title}</h2>
        <div className="products-slider__actions">
          <RoundButton
            buttonType={slideIndex === 0 ? 'left-disabled' : 'left'}
            onClick={previousSlide}
            disabled={slideIndex === 0}
          />
          <RoundButton
            buttonType={
              slideIndex === products.length - 4 ? 'right-disabled' : 'right'
            }
            onClick={nextSlide}
            disabled={slideIndex === products.length - 4}
          />
        </div>
      </div>
      <div className="products-slider__container" style={containerStyles}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
