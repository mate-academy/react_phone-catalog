import React, { useState } from 'react';
import './ProductsSlider.scss';
// import classNames from 'classnames';
import ProductCard from '../ProductCard/ProductCard';


type Props = {
  visibleProducts: Product[];
  title: string;
};

const ProductsSlider: React.FC<Props> = ({ visibleProducts, title }) => {
  const [index, setIndex] = useState(0);
  const slideWidth = 291;

  const prevproduct = () => {
    if (index === 0) {
      setIndex(visibleProducts.length - 4);
    } else {
      setIndex(index - 1);
    }
  };

  const nextProduct = () => {
    if (index === visibleProducts.length - 4) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <>

      <div className="ProductsSlider">
        <h2>{title}</h2>
        <div className="ProductsSlider__buttons ">
          <button
            type="button"
            className="ProductsSlider__button ProductsSlider__button--prev"
            onClick={prevproduct}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="#313237" />
            </svg>

          </button>
          <button
            type="button"
            className="ProductsSlider__button ProductsSlider__button--next"
            onClick={nextProduct}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill="#313237" />
            </svg>
          </button>
        </div>
        <div className="ProductsSlider__container">
          <div
            className="ProductsSlider__list"
            style={{
              transform: `translateX(-${index * slideWidth}px)`,
            }}
          >
            {visibleProducts.map((product) => (
              <ProductCard product={product} />

            ))}
          </div>
        </div>
      </div>


    </>
  );
};

export default ProductsSlider;
