import { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      return prevIndex + 1 < products.length
        ? prevIndex + 1 : prevIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      return prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex;
    });
  };

  return (
    <div className="products-slider">
      <div className="slider-header">
        <h1>{title}</h1>
        <div className="slider-controls">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img
              src="/img/icons/arrowRight.svg"
              alt="arrowLeft"
              style={{ transform: 'rotate(-90deg)' }}
            />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === products.length - 4}
          >
            <img
              src="/img/icons/arrowRight.svg"
              alt="arrowRight"
              style={{ transform: 'rotate(90deg)' }}
            />
          </button>
        </div>
      </div>
      <div
        data-cy="cardsContainer"
        className="slider-container"
        style={{ transform: `translateX(-${currentIndex * (272 + 16)}px)` }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
