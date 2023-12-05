import React, { useState } from 'react';
import './ProductsSlider.scss';
import arrowLeft from '../../icons/arrow-left.svg';
import arrowRight from '../../icons/arrow-right.svg';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';

interface Props {
  products: Product[],
  isLoading: boolean,
  isError: boolean,
  title: string,
}

export const ProductsSlider: React.FC<Props> = ({
  products,
  isLoading,
  isError,
  title,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrevClick = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setSlideIndex((prevIndex) => Math
      .min(prevIndex + 1, Math.ceil(products.length / 4) - 1));
  };

  return (
    <section className="productsSlider">
      <div className="productsSlider__header">
        <h1 className="productsSlider__header--title">
          {title}
        </h1>
        <div className="productsSlider__header--btn">
          <button
            className="productsSlider__button"
            type="button"
            onClick={handlePrevClick}
            disabled={slideIndex === 0}
          >
            <img src={arrowLeft} alt="button-left" />
          </button>
          <button
            className="productsSlider__button"
            type="button"
            onClick={handleNextClick}
            disabled={slideIndex === Math.ceil(products.length / 4) - 1}
          >
            <img src={arrowRight} alt="button-left" />
          </button>
        </div>
      </div>

      <div className="productsSlider__content">
        {isLoading && !isError && <Loader />}
        {!isLoading && isError && (
          <p>
            Error: Unable to load data from server!
          </p>
        )}
        {!isLoading && !isError && (
          <ul
            className="productsSlider__list"
            style={{ transform: `translateX(-${slideIndex * (272 * 4 + 16 * 4)}px)` }}
          >
            {products.map(product => (
              <li
                className="productsSlider__item"
                key={product.id}
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}

      </div>
    </section>
  );
};
