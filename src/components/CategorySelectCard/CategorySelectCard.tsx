import React from 'react';
import './CategorySelectCard.scss';

export const CategorySelectCard: React.FC = () => {
  return (
    <div className="select-category">
      <div className="select-category__image-wrapper">
        <img
          className="select-category__image"
          src="/img/category-phones.webp"
          alt="category image"
        />
      </div>
      <div className="select-category__description">
        <p className="select-category__title">Mobile phones</p>
        <p className="select-category__models">95 models</p>
      </div>
    </div>
  );
};
