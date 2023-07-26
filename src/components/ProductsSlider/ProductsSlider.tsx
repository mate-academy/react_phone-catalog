import React, { useState } from 'react';

import arrowLeft from '../../images/arrows/arrow-left.svg';
import arrowRight from '../../images/arrows/arrow-right.svg';

import './ProductsSlider.scss';

const cardData = [
  { id: 1, content: 'Card 1' },
  { id: 2, content: 'Card 2' },
  { id: 3, content: 'Card 3' },
  { id: 4, content: 'Card 4' },
  { id: 5, content: 'Card 5' },
  { id: 6, content: 'Card 6' },
  { id: 7, content: 'Card 7' },
  { id: 8, content: 'Card 8' },
];

type Props = {
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ title }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevClick = () => {
    setStartIndex((prevStartIndex) => Math.max(0, prevStartIndex - 1));
  };

  const handleNextClick = () => {
    setStartIndex((prevStartIndex) => Math.min(
      prevStartIndex + 1,
      cardData.length - 4,
    ));
  };

  const visibleCards = cardData.slice(startIndex, startIndex + 4);

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__content">
        <h2 className="ProductsSlider__title">{title}</h2>

        <div className="ProductsSlider__buttons">
          <button
            type="button"
            onClick={handlePrevClick}
            disabled={startIndex === 0}
            className="ProductsSlider__button"
          >
            <img src={arrowLeft} alt="arrow-left" />
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            disabled={startIndex === cardData.length - 4}
            className="ProductsSlider__button"
          >
            <img src={arrowRight} alt="arrow-right" />
          </button>
        </div>
      </div>

      <div className="ProductsSlider__cards">
        {visibleCards.map((card) => (
          <div className="ProductsSlider__card" key={card.id}>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
};
