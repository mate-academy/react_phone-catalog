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
      // Обмежуємо slideIndex кількістю слайдів
      const totalSlides = 6; // Змініть це значення відповідно до кількості ваших слайдів

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
          <RoundButton buttonType="left" onClick={previousSlide} />
          <RoundButton buttonType="right" onClick={nextSlide} />
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
