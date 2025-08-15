import React from 'react';
import './CategorySelectCard.scss';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  quantity: number;
  image: string;
  path: string;
};

export const CategorySelectCard: React.FC<Props> = ({
  title,
  quantity,
  image,
  path,
}) => {
  return (
    <Link to={path} className="select-category">
      <div className="select-category__image-wrapper">
        <img
          className="select-category__image"
          src={image}
          alt="category image"
        />
      </div>
      <div className="select-category__description">
        <p className="select-category__title">{title}</p>
        <p className="select-category__models">{quantity} models</p>
      </div>
    </Link>
  );
};
