import './ProductSlider.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';

interface Props {
  title: string,
  products: Product[],
  isLoader: boolean,
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  isLoader,
}) => {
  const [sliderPage, setSliderPage] = useState(1);
  const totalPages = Math.ceil(products.length / 4);
  const isFirstPage = sliderPage === 1;
  const isLastPage = sliderPage === totalPages;
  const translateDistance = (sliderPage - 1) * 1152;

  const handlePrevClick = () => {
    setSliderPage(prevState => prevState - 1);
  };

  const handleNextClick = () => {
    setSliderPage(prevState => prevState + 1);
  };

  return (
    <article className="slider">
      <div className="slider__top">
        <h1 className="slider__header">{title}</h1>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className={classNames('button slider__button', {
            'button--disabled': isFirstPage,
          })}
          onClick={handlePrevClick}
        >
          {isFirstPage
            ? <i className="icon icon--arrow-left-grey" />
            : <i className="icon icon--arrow-left" />}
        </button>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className={classNames('button slider__button', {
            'button--disabled': isLastPage,
          })}
          onClick={handleNextClick}
        >
          {isLastPage
            ? <i className="icon icon--arrow-right-grey" />
            : <i className="icon icon--arrow-right" />}
        </button>
      </div>
      <ul
        className="slider__bottom"
      >
        {products.map(product => (
          <li
            key={product.id}
            className="slider__item"
          >
            <ProductCard
              key={product.id}
              product={product}
              translateDistance={translateDistance}
            />
          </li>
        ))}
        {isLoader && (<Loader />)}
      </ul>
    </article>
  );
};
