import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.scss';

interface Props {
  title: string;
  count: number;
  image: string;
  to: string;
}

export const CategoryCard: React.FC<Props> = ({ title, count, image, to }) => {
  return (
    <Link to={to} className="category-card">
      <div className="category-card__image-wrapper">
        <img src={image} alt={title} className="category-card__image" />
      </div>

      <h3 className="category-card__title">{title}</h3>
      <p className="category-card__count">{count} models</p>
    </Link>
  );
};
