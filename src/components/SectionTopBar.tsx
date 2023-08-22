/* eslint-disable max-len */
import React from 'react';
import { Phone } from '../types/Phone';

interface Props {
  title: string;
  currentIndex: number;
  setCurrentIndex:React.Dispatch<React.SetStateAction<number>>
  // productsLength: number;
  productsPerPage: number;
  filteredProducts: Phone[]
}

const SectionTopBar: React.FC<Props> = ({
  title, currentIndex, setCurrentIndex, productsPerPage, filteredProducts, // productsLength
}) => {
  const maxIndex = filteredProducts.length - productsPerPage;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + productsPerPage));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - productsPerPage));
  };

  return (
    <div className="section__top-bar">
      <h2 className="section__title">{title}</h2>

      <div className="section__buttons-container">
        <button disabled={currentIndex === 0} type="button" className="section__button slider-button" onClick={prevSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z"
              fill="#B4BDC4"
            />
          </svg>
        </button>
        <button disabled={currentIndex === maxIndex} type="button" className="section__button slider-button" onClick={nextSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
              fill="#B4BDC4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SectionTopBar;
