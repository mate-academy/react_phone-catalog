import { useState } from 'react';

import { ProductCard } from '../ProductCard/ProductCard';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import leftArrow from '../../assets/l_arrow.svg';
import rightArrow from '../../assets/r_arrow.svg';

import './CardsContainer.scss';

type CardsContainerProps = {
  title: string;
};

const toSlide = (272 + 24) / 1136;

export const CardsContainer = ({ title }: CardsContainerProps) => {
  const [page, setPage] = useState(0);

  const handleClick = (operation: 1 | -1) => {
    if (operation === 1) {
      setPage(prevPage => prevPage + toSlide);
    } else {
      setPage(prevPage => prevPage - toSlide);
    }
  };

  return (
    <section className="cards-container">
      <div className="cards-container__header">
        <h1 className="cards-container__title">{title}</h1>
        <div className="cards-container__controls">
          <button
            className="cards-container__button"
            type="button"
            onClick={() => handleClick(-1)}
          >
            <img
              src={leftArrow}
              alt="Left arrow button to control the slider"
            />
          </button>
          <button
            className="cards-container__button"
            type="button"
            onClick={() => handleClick(1)}
          >
            <img
              src={rightArrow}
              alt="Right arrow button to control the slider"
            />
          </button>
        </div>
      </div>

      <div className="cards-container__slider">
        <ProductSlider page={page} gap={24}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductSlider>
      </div>
    </section>
  );
};
