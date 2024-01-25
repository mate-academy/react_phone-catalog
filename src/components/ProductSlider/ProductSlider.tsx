import React, { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../type/Product';
import './ProductSlider.scss';

interface ProductsSliderProps {
  products: Product[];
  title: string,
}

export const ProductSlider: React.FC<ProductsSliderProps> = ({
  products,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.ceil(products.length / 4) - 1;

  const handleNext = () => {
    setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  };

  const startIndex = currentIndex * 4;
  const displayedProducts = products.slice(startIndex, startIndex + 4);

  return (
    <>
      <div className="productSlider">
        <div className="productSlider__title-and-button">
          <h2 className="productSlider__title">{title}</h2>

          <div className="productSlider__buttons">
            <button
              type="button"
              className="button button--prev"
              onClick={handlePrevious}
              aria-label="Previous"
            />
            <button
              type="button"
              className="button button--next"
              onClick={handleNext}
              aria-label="Next"
            />
          </div>
        </div>

        <div
          className=" productSlider__container"
          data-cy="cardsContainer"
        >
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className={`productSlider__card 
              ${currentIndex * 4 + index < products.length
              ? 'productSlider__card--visible' : ''}`}
            >
              <ProductCard
                product={product}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
