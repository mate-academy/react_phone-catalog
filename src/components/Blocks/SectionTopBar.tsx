import React from 'react';
import { Product } from '../../types/Phone';
import { IconSlideLeft, IconSlideRight } from '../../utils/Icons';

interface Props {
  title: string;
  currentIndex: number;
  setCurrentIndex:React.Dispatch<React.SetStateAction<number>>;
  productsPerPage: number;
  filteredProducts: Product[];
}

const SectionTopBar: React.FC<Props> = ({
  title,
  currentIndex,
  setCurrentIndex,
  productsPerPage,
  filteredProducts,
}) => {
  const maxIndex = (
    filteredProducts.length / productsPerPage
  ) <= currentIndex + 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1));
  };

  return (
    <div className="section__top-bar">
      <h2 className="section__title">{title}</h2>

      <div className="section__buttons-container">
        <button
          disabled={currentIndex === 0}
          type="button"
          className="section__button slider-button"
          onClick={prevSlide}
        >
          <IconSlideLeft />
        </button>

        <button
          disabled={maxIndex}
          type="button"
          className="section__button slider-button"
          onClick={nextSlide}
        >
          <IconSlideRight />
        </button>
      </div>
    </div>
  );
};

export default SectionTopBar;
